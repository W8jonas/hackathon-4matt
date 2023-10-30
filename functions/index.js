
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
admin.initializeApp();

const { readDocuments } = require("./utils/readDocuments");
const { deleteDocuments } = require("./utils/deleteDocuments");
const { updateDocument } = require("./utils/updateDocument");
const fetch = require("node-fetch");


exports.resetRooms = onRequest({
    cors: ['*']
}, async (request, response) => {
    try {
        const data = await readDocuments('services')
        await deleteDocuments('services', data.map(doc => doc.id))

        response.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        })
        response.status(200).json("Operação concluida!");
    } catch (error) {
        console.log('error > ', error)
        response.status(500).json("error!", error?.message);
    }
});

exports.updateRoom = onRequest({
    cors: ['*'],
}, async (request, response) => {
    try {
	    const {id: roomId} = request.query;
        const data = request.body
        
        const resp = await updateDocument('services', roomId, data)

        response.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        })
        response.status(200).json(resp)
    } catch (error) {
        console.log('error > ', error)
        response.status(500).json("error!", error?.message);
    }
});


exports.webhookServiceNow = onRequest({
    cors: ['*', 'hackathon-4matt.web.app'],
}, async (request, response) => {
    try {
        const data = request.body
        
        const resp = await fetch('https://4matttecnologiadainformacaoltdademo3.service-now.com/api/now/table/incident', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa('ufjf.hackathon:@Ufjf2023'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(JSON.parse(data))
        })
        const respJson = await resp.json()

        response.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        })
        response.json(respJson)
    } catch (error) {
        console.log('error > ', error)
        response.status(500).json("error!", error?.message);
    }
});

