function initSDK() {
	return new Appwrite()
		.setEndpoint('https://api.cloudness.es/v1') // Your API Endpoint
		.setProject('61a5104defa30'); // Your project ID
}

// Inicia el juego como tal
function init() {
	sdk.subscribe('collections.61b4e927864c5.documents', (response) => {
		getDocuments(limitRanking, (docs) => {
			drawRanking(docs);
			drawPosition(docs);
		});
	});

	getDocument((docs) => {
		if (docs.length == 0) {
			createDocument();
		} else idDocumento = docs[0].$id;
	});

	getDocuments(limitRanking, (docs) => {
		const opciones = {
			autoplay: false,
			autoplayRestart: true,
			showFieldOnStart: true,
			theme: 'candy',
			blockWidth: 10,
			autoBlockWidth: false,
			autoBlockSize: 24,
			difficulty: 'normal',
			speed: 15,

			playText: 'Dale a jugar para empezar',
			playButtonText: 'Jugar',
			gameOverText: 'Al pozo',
			restartButtonText: 'Jugar otra vez',
			scoreText: 'Puntuación',

			onStart: function () {
				console.log('Partida iniciada!');
			},
			onRestart: function () {
				onLinea(0);
			},
			onGameOver: function (score) {
				onFinishStart();

				//setTimeout(() => {
				//	onFinishEnd();
				//}, timeToReloadPage);
			},

			onLine: function (lines, scoreIncrement, score) {
				console.log('Has puntuado!');

				updateDocument(score);
				onLinea(score);
			},
		};

		drawRanking(docs);
		drawPosition(docs);

		$('.juego').blockrain(opciones);
		showGame();
	});
}

function isOwnDocument(doc) {
	return idUser === doc.userid;
}

function drawRanking(documents) {
	let data = '';

	documents.forEach((doc, index) => {
		data += `
		<div style='${
			isOwnDocument(doc) ? 'border: 1px solid #00ff19;' : ''
		} margin: 5px; padding: 10px; display: flex; justify-content: space-between;'>
            <span>${index + 1}.</span>
            <span style="margin-right: 25px">${
							doc.nombre.length > 10
								? `${doc.nombre.substring(0, 10)} -`
								: doc.nombre
						}</span>
			<span style='text-align: right; color: #00ff19'>${doc.puntuacion}</span>
		</div>`;
	});

	$('#rankingContent').html(
		`<div class="records" style="margin-top: 15px">${data}</div>`
	);
}

function drawPosition(docs) {
	for (let i = 0; i < docs.length; i++) {
		if (docs[i].userid == idUser) {
			$('#posicion').html(i + 1);
			return;
		}
	}

	$('#posicion').html('+100');
}

function showGame() {
	console.log('El juego se deberia de mostrar');
}

function onLinea(puntuacion) {
	$('#puntuacion').text(puntuacion);
}

// Que ocurrira justo antes de que la partida termine?
function onFinishStart() {
	console.log('Partida terminada');
}

// Que ocurrira cuando termine la partida?
function onFinishEnd() {
	window.location.reload();
}
