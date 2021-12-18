const timeToReloadPage = 3000;
const limitRanking = 5;
const sdk = initSDK();

let idSession, idUser, idDocumento;

createSession('', '', () => {
	init();
});
