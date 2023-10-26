import { firestoreDatabase } from '../services/firebase';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';


export function Data() {

    async function getICs(callback) {
        const unsubscribe = onSnapshot(
            collection(firestoreDatabase, "ICs"),
            (querySnapshot) => {
                const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
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
                const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
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
