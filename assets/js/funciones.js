function onLinea(puntuacion) {
	$('#puntuacion').text(puntuacion);
}

function initSDK() {
	return new Appwrite()
		.setEndpoint('https://api.cloudness.es/v1') // Your API Endpoint
		.setProject('61a5104defa30'); // Your project ID
}

// Que ocurrira justo antes de que la partida termine?
function onFinishStart() {
	console.log('Partida terminada');
}

// Que ocurrira cuando termine la partida?
function onFinishEnd() {
	window.location.reload();
}

// Funcionar funciona, pero el problema esta en que el doc esta paginado, por lo que esta funcion no
// funcionaria bien
function getPartidasPropias() {
	// El user: esta porque read[0] lo tiene
	return documents.filter(
		(doc) => doc.$permissions.read[0] === `user:${idUser}`
	);
}

function drawRanking(documents) {
	let data = '';

	documents.forEach((doc) => {
		data += `
		<div style='margin: 5px; padding: 10px; display: flex; justify-content: space-between;'>
            ${doc.nombre}
			<span style='text-align: right; color: #00ff19'>${doc.puntuacion}</span>
		</div>`;
	});

	$('#rankingContent').html(`<div style="margin-top: 15px">${data}</div>`);
}
