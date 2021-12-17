const timeToShowMessage = 500;
const timeToReloadPage = 3000;
const limitRanking = 5;
const sdk = initSDK();

// Sesion de prueba
createSession('', '');
getDocuments(limitRanking).then((res) => {
	console.log(res.documents);
	drawRanking(res.documents);
});

sdk.subscribe('collections.61b4e927864c5.documents', response => {
    console.log("buenas")
	getDocuments(limitRanking).then((res) => {
		console.log(res.documents);
		drawRanking(res.documents);
	});
});

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
		createDocument();
	},
	onRestart: function () {
		onLinea(0);
	},
	onGameOver: function (score) {
		console.log('Partida terminada!');

		//setTimeout(() => {
		//	onFinishStart();
		//}, timeToShowMessage);

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

let idDocumento, idSession, idUser;
