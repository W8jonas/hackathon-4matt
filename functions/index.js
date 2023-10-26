
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
admin.initializeApp();

const { readDocuments } = require("./utils/readDocuments");
const { deleteDocuments } = require("./utils/deleteDocuments");
const { updateDocument } = require("./utils/updateDocument");


exports.resetRooms = onRequest({
    cors: ['*']
}, async (request, response) => {
    try {
        const data = await readDocuments('rooms')
        await deleteDocuments('rooms', data.map(doc => doc.id))

        response.status(200).json("Operação concluida!");
    } catch (error) {
        console.log('error > ', error)
        response.status(500).json("error!", error?.message);
    }
});

exports.updateRoom = onRequest({
    cors: ['*']
}, async (request, response) => {
    try {
	    const {id: roomId} = request.query;
        const data = request.body
        
        const resp = await updateDocument('rooms', roomId, data)

        response.status(200).json(resp)
    } catch (error) {
        console.log('error > ', error)
        response.status(500).json("error!", error?.message);
    }
});

