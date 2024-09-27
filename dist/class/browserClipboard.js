export async function copyTextToClipboard(text) {
	let result = { result: false, error: undefined };
	// Primero, intentamos usar la API moderna si está disponible
	if (navigator.clipboard && navigator.clipboard.writeText) {
		try {
            await navigator.clipboard.writeText(text);
			result.result = true;
		} catch (error) {
			result.error = err;
		}
	} else {
		// Fallback para navegadores que no soportan la API clipboard (HTTP o viejos navegadores)
		let tempInput = document.createElement('input');
		tempInput.style.position = 'absolute';
		tempInput.style.left = '-9999px'; // Colocar fuera de la pantalla
		tempInput.setAttribute('readonly', 'true'); // Evita que el input sea editable
		tempInput.value = text;
		document.body.appendChild(tempInput);

		tempInput.select();
		tempInput.setSelectionRange(0, 99999); // Para compatibilidad en móviles

		try {
			document.execCommand('copy');
			//console.log("Texto copiado al portapapeles usando execCommand.");
			result.result = true;
		} catch (err) {
			result.error = err;
			//console.error("Error al copiar usando execCommand: ", err);
		}

		// Remover el input temporal
		document.body.removeChild(tempInput);
	}
	return result;
}
