//Function that creates a session
function createSession(correo, password, callback) {
	let promise = sdk.account.createSession(correo, password);

	promise.then(
		function (response) {
			console.log(response); // Success
			idSession = response.$id;
			idUser = response.userId;
			document.getElementById('pantallaJuego').classList.remove('d-none');
			document.getElementById('pantallaJuego').classList.add('d-flex');
			document.getElementById('login').classList.remove('d-flex');
			document.getElementById('login').classList.add('d-none');
			callback();
		},
		function (error) {
			console.log(error); // Failure
		}
	);
}

async function deleteSession() {
	let promise = sdk.account.deleteSession(idSession);

	promise.then(
		function (response) {
			console.log(response); // Success
		},
		function (error) {
			console.log(error); // Failure
		}
	);
}

//Function that creates a void Document in the collection
async function createDocument() {
	let session = await getAccount();

	let promise = sdk.database.createDocument(
		'61b4e927864c5',
		{
			nombre: session.name,
			userid: idUser,
		},
		['*']
	);

	promise.then(
		function (response) {
			console.log(response.$id); // Success
			idDocumento = response.$id;
		},
		function (error) {
			console.log(error); // Failure
		}
	);
}

//Function that returns all documents
function getDocuments(limit, callback) {
	let promise = sdk.database.listDocuments(
		'61b4e927864c5',
		'',
		limit,
		0,
		'puntuacion',
		'DESC',
		'int'
	);

	promise.then(
		function (response) {
			callback(response.documents);
		},
		function (error) {
			console.log(error); // Failure
		}
	);
}

function getDocument(callback) {
	let promise = sdk.database.listDocuments('61b4e927864c5', [
		`userid=${idUser}`,
	]);

	promise.then(
		function (response) {
			callback(response.documents);
		},
		function (error) {
			console.log(error); // Failure
		}
	);
}

function updateDocument(puntuacion) {
	let promise = sdk.database.getDocument('61b4e927864c5', idDocumento);

	promise.then(
		function (response) {
			if (response.puntuacion < puntuacion) {
				console.log('updating');
				let promise = sdk.database.updateDocument(
					'61b4e927864c5',
					idDocumento,
					{
						puntuacion: puntuacion,
					}
				);

				promise.then(
					function (response) {
						console.log(response); // Success
						documents = response.documents;
					},
					function (error) {
						console.log(error); // Failure
					}
				);
			}
		},
		function (error) {
			console.log(error); // Failure
		}
	);
}

function getAccount() {
	let promise = sdk.account.get();

	let respuesta = promise.then(
		function (response) {
			console.log(response); // Success
			return response;
		},
		function (error) {
			console.log(error); // Failure
		}
	);
	return respuesta;
}
