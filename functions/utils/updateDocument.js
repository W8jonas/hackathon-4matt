const admin = require("firebase-admin");

async function updateDocument(collectionName, docId, data) {
	const response = await admin.firestore().collection(collectionName).doc(docId).set({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
	return response
}

module.exports = {
	updateDocument,
};
