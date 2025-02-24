import { sha256 } from '../../class/sha.js';

export function ProcessDataTable(values) {
	return new Promise((resolve, reject) => {
		const data = values.data;
		const columns = values.columns;
		let hash_last_data = values.hash_last_data;
		let different_data = false;
		let result = [];
		//	console.log('Datos recibidos en Worker:', columns, data.data);

		if (checkIsArray(data)) {
			try {
				let sf = JSON.stringify(data);
				let hash_data = sha256(sf && sf.length > 0 ? sf : '0');

			//	console.log(hash_last_data, hash_data);

				if (hash_last_data !== hash_data) {
					hash_last_data = hash_data;
					result = AddHashRowAndReorderColumns(data, columns);
					different_data = true;
				} else {
					console.log('No changes on Data on Table widget');
				}

				resolve({
					data: result,
					hash_last_data: hash_last_data,
					different_data: different_data
				});
			} catch (error) {
				console.log(error);
				reject(error);
			}
		}
	});
}

export function checkIsArray(data) {
	return data && Array.isArray(data);
}

function AddHashRowAndReorderColumns(RawDataTable, columns) {
	let Listinternal_hash_row = {}; // Esta variable se usa unicamente para verificar que no se generen llaves duplicadas

	let data_01 = RawDataTable.map((row, i) => {
		try {
			row.internal_hash_row = 0;
			let c = sha256(JSON.stringify(row));

			//console.log('Registro HASH >> ', c);
			if (Listinternal_hash_row[c]) {
				console.error('Hay un registro duplicado en la tabla', row);
				c = c + '-' + i;
				Listinternal_hash_row[c] = true;
			}
			Listinternal_hash_row[c] = true;
			row.internal_hash_row = c;
		} catch (error) {
			console.error(error, row);
		}

		// Reordenar la posicion de las columnas de acuerdo al orden de la parametrizaicion de las columnas
		let new_row = {};
		for (let col in columns) {
			//console.log(`Clave: ${clave}, Valor: ${miObjeto[clave]}`);
			if (Object.hasOwn(row, col)) {
				new_row[col] = row[col];
			}
		}

		// Se agrega el resto de columnas que no están en la parametrizacion de columnas
		for (let col in row) {
			if (!new_row[col]) {
				new_row[col] = row[col];
			}
		}

		return new_row;
	});

	// Filtra solo los que tienen datos
	return data_01.filter((row) => {
		return row && row.internal_hash_row;
	});
}
