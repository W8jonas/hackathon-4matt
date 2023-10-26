import { firestoreDatabase } from '../services/firebase';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';


function addRenderOptions(nodeDoc, type) {

    const node = { ...nodeDoc.data(), id: nodeDoc.id }

    if (type === 'Room') {
        node.label = node.id.split(':')[3]
        node.position = {x: 0, y: 0}
    }

    return {
        id: node.id,
        position: {x: 0, y: 0, ...node?.position},
		data: { ...node, ...node?.data},
		type: type || node.type,
        draggable: true,
    }
}

export function Data() {

    async function getICs(callback) {
        const unsubscribe = onSnapshot(
            collection(firestoreDatabase, "ICs"),
            (querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => addRenderOptions(doc, null))
                callback(data)
            },
            (err) => console.log('err', err)
        );

        return unsubscribe
    }


    async function getServices(callback) {
        const unsubscribe = onSnapshot(
            collection(firestoreDatabase, "services"),
            (querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => addRenderOptions(doc, 'Room'))
                callback(data)
            },
            (err) => console.log('err', err)
        );
        return unsubscribe
    }
    
    async function getRelationships() {
        const querySnapshot = await getDocs(collection(firestoreDatabase, "relationship"));
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        return data
    }

    return {
        getICs,
        getServices,
        getRelationships,
    }
}
