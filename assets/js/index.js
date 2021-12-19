const timeToReloadPage = 3000;
const limitRanking = 5;
const sdk = initSDK();

let idSession, idUser, idDocumento;

document.addEventListener('submit', (e) => {
	e.preventDefault();

	showSpinner();

	correo = document.getElementById('correo').value;
	password = document.getElementById('password').value;

	createSession(
		correo,
		password,
		() => {
			init();
		},
		() => {
			console.log('Deberia mostrar una alerta de error');
			hideSpinner();
		}
	);
});
