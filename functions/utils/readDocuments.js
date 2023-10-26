
async function readDocuments(collectionName, amountLimit = 1000) {
	const snap = await admin.firestore().collection(collectionName).orderBy("createdAt").limit(amountLimit).get();
	const data = snap.docs.map(doc => ({...doc.data(), id: doc.id}));
	return data
}

module.exports = {
	readDocuments,
};
