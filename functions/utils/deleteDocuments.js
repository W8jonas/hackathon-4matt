const admin = require("firebase-admin");

async function deleteDocuments(collectionName, docsIds) {
	const promises = docsIds.map(
		async (documentId) => admin.firestore().collection(collectionName).doc(documentId).delete(),
	);

	return Promise.all(promises);
}

module.exports = {
	deleteDocuments,
};
