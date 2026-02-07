import { sha256 } from '../../class/sha.js';

// Escucha mensajes desde el hilo principal
self.onmessage = function (event) {
	const data = JSON.parse(event.data);
	const columns = data.columns;
	let hash_last_data = data.hash_last_data;
	let different_data = false;
	let result = [];

	if (RawDataTableIsArray(data.data) && data.data.length > 0) {
		try {
			// Calculate hash of the new data based on primitives
			const { processedData, globalHash } = ProcessRawData(data.data, columns);

			if (hash_last_data !== globalHash) {
				hash_last_data = globalHash;
				result = processedData;
				different_data = true;
			} else {
				console.log('No changes on Data on Table widget');
			}
		} catch (error) {
			console.log(error);
		}
	}

	// Envía el resultado de vuelta al hilo principal
	self.postMessage({
		data: result,
		hash_last_data: hash_last_data,
		different_data: different_data
	});
};

function RawDataTableIsArray(data) {
	return data && Array.isArray(data);
}

function GenerateRowHash(row) {
	// Generate a hash string based ONLY on primitive values processing in key order
	// to ensure consistency.
	// However, iterating Object.keys is generally insertion order.
	// To be perfectly safe, we should sort keys if we want deterministic hash across JS engines 
	// for objects created differently, but for performance we rely on standard iteration 
	// since incoming data usually has consistent structure.

	// User requested: "en caso de que la columna contenga un objeto json o array no aplicar el ordenmiento, solo aplicar el ordenamiento para tipos basicos"
	// We interpret "ordenamiento" as "hashing/processing" for duplicate detection.

	let hashStr = "";
	// We iterate the row properties directly.
	for (const key in row) {
		if (!Object.prototype.hasOwnProperty.call(row, key)) continue;
		if (key === 'internal_hash_row') continue;

		const value = row[key];
		const type = typeof value;

		// Include primitives in hash
		if (value === null) {
			hashStr += key + ":null|";
		} else if (value instanceof Date) {
			hashStr += key + ":" + value.getTime() + "|";
		} else if (type === 'string' || type === 'number' || type === 'boolean') {
			hashStr += key + ":" + value + "|";
		}
		// Complex objects (arrays, objects) are ignored for the hash
	}

	return sha256(hashStr);
}

function ProcessRawData(RawDataTable, columns) {
	const processedData = [];
	const seenHashes = new Set();
	let globalHashContent = "";

	// Determine column order from config if provided
	// 'columns' might be an object { colName: config, ... } or possibly array. 
	// The previous code iterated 'for (let col in columns)' implying keys.
	const orderedKeys = columns ? Object.keys(columns) : [];

	for (let i = 0; i < RawDataTable.length; i++) {
		const row = RawDataTable[i];

		// 1. Generate Hash
		let rowHash = GenerateRowHash(row);

		// 2. Handle Duplicates / Collisions
		// If hash exists, append index to make unique ID for the frontend key
		if (seenHashes.has(rowHash)) {
			// Check if it's a real duplicate or collision (we can't easily without full compare)
			// But since we are intentionally ignoring objects, different objects might have same hash.
			// We just ensure UNIQUE ID for the row.
			let counter = 1;
			let originalHash = rowHash;
			while (seenHashes.has(rowHash)) {
				rowHash = originalHash + "-" + counter + "-" + i; // mix index to be sure
				counter++;
			}
		}
		seenHashes.add(rowHash);

		// Add to global hash
		globalHashContent += rowHash.substring(0, 16); // Use part of hash to build global signature

		// 3. Construct New Row with correct column order
		const new_row = {};
		new_row.internal_hash_row = rowHash;

		// Add configured columns first
		for (const col of orderedKeys) {
			if (Object.prototype.hasOwnProperty.call(row, col)) {
				new_row[col] = row[col];
			}
		}

		// Add remaining columns
		for (const col in row) {
			if (col !== 'internal_hash_row' && !Object.prototype.hasOwnProperty.call(new_row, col)) {
				new_row[col] = row[col];
			}
		}

		processedData.push(new_row);
	}

	const globalHash = sha256(globalHashContent);

	return { processedData, globalHash };
}
