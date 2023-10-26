const admin = require("firebase-admin");

async function readDocuments(collectionName, amountLimit = 1000) {
	const snap = await admin.firestore().collection(collectionName).orderBy("updatedAt").limit(amountLimit).get();
	const data = snap.docs.map(doc => ({...doc.data(), id: doc.id}));
	return data
}

module.exports = {
	readDocuments,
};
