//Function that creates a session
function createSession(correo, password) {
	let promise = sdk.account.createSession(correo, password);

	promise.then(
		function (response) {
			console.log(response); // Success
			idSession = response.$id;
			idUser = response.userId;
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
	let session = await getaccount();

	let promise = sdk.database.createDocument('61b4e927864c5', {
		nombre: session.name,
	}, ["*"]);

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
function getDocuments(limit) {
	return sdk.database.listDocuments(
		'61b4e927864c5',
		'',
		limit,
		0,
		'puntuacion',
		'DESC',
		'int'
	);
}

function updateDocument(puntuacion) {
	let promise = sdk.database.updateDocument('61b4e927864c5', idDocumento, {
		puntuacion: puntuacion,
	});

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

function getaccount() {
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
