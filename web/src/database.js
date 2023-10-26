import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { firestoreDatabase } from './services/firebase';

const buildings = [
	{
		id: 'building-1',
		position: { x: -400, y: 120 },
		data: { label: 'Prédio ICE' },
		type: 'Building',
        draggable: true,
	},
	{
		id: 'building-2',
		position: { x: 400, y: 120 },
		data: { label: 'Prédio Computação' },
		type: 'Building',
        draggable: true,
	},
]

const floors = [
	{
		id: 'floor-1',
		position: { x: -600, y: 240 },
		data: { label: 'Primeiro andar' },
		type: 'Floor',
        draggable: true,
	},
	{
		id: 'floor-2',
		position: { x: -400, y: 240 },
		data: { label: 'Segundo andar' },
		type: 'Floor',
        draggable: true,
	},
	{
		id: 'floor-3',
		position: { x: -200, y: 240 },
		data: { label: 'Terceiro andar' },
		type: 'Floor',
        draggable: true,
	},
	{
		id: 'floor-4',
		position: { x: 200, y: 240 },
		data: { label: 'Primeiro andar' },
		type: 'Floor',
        draggable: true,
	},
]

const rooms = [
	{
		id: 'room-1',
		position: { x: -600, y: 400 },
		data: { label: 'Sala S401', temp: 25, status: 'ok' },
		type: 'Room',
        draggable: true,
	},
	{
		id: 'room-2',
		position: { x: -600, y: 550 },
		data: { label: 'Sala S402', temp: 25, status: 'ok' },
		type: 'Room',
        draggable: true,
	},
	{
		id: 'room-3',
		position: { x: -600, y: 700 },
		data: { label: 'Sala S403', temp: 25, status: 'ok' },
		type: 'Room',
        draggable: true,
	},
	{
		id: 'room-4',
		position: { x: -600, y: 850 },
		data: { label: 'Sala S404', temp: 70, status: 'Incêndio' },
		type: 'Room',
        draggable: true,
	},
]

const allNodes = [
	{
		id: 'master-1',
		position: { x: 0, y: 0 },
		data: { label: 'UFJF Central' },
		type: 'Master',
        draggable: true,
	},
	...buildings,
	...floors,
	...rooms,
];

const initialEdges = [
	{ source: 'master-1', target: 'building-1' },
	{ source: 'master-1', target: 'building-2' },
	
	{ source: 'building-1', target: 'floor-1' },
	{ source: 'building-1', target: 'floor-2' },
		
	{ source: 'building-2', target: 'floor-3' },
	{ source: 'building-2', target: 'floor-4' },
	

	{ source: 'floor-1', target: 'ufjf:pdc:floor-1:101' },
	{ source: 'floor-1', target: 'ufjf:pdc:floor-1:102' },
	{ source: 'floor-1', target: 'ufjf:pdc:floor-1:103' },
	{ source: 'floor-1', target: 'ufjf:pdc:floor-1:104' },
	{ source: 'floor-1', target: 'ufjf:pdc:floor-1:105' },
	
	{ source: 'floor-2', target: 'ufjf:pdc:floor-2:201' },
	{ source: 'floor-2', target: 'ufjf:pdc:floor-2:202' },
	{ source: 'floor-2', target: 'ufjf:pdc:floor-2:203' },
	{ source: 'floor-2', target: 'ufjf:pdc:floor-2:204' },
	{ source: 'floor-2', target: 'ufjf:pdc:floor-2:205' },
	
	{ source: 'floor-3', target: 'ufjf:ice:floor-1:101' },
	{ source: 'floor-3', target: 'ufjf:ice:floor-1:102' },
	{ source: 'floor-3', target: 'ufjf:ice:floor-1:103' },
	{ source: 'floor-3', target: 'ufjf:ice:floor-1:104' },
	{ source: 'floor-3', target: 'ufjf:ice:floor-1:105' },
	
	{ source: 'floor-4', target: 'ufjf:ice:floor-2:201' },
	{ source: 'floor-4', target: 'ufjf:ice:floor-2:202' },
	{ source: 'floor-4', target: 'ufjf:ice:floor-2:203' },
	{ source: 'floor-4', target: 'ufjf:ice:floor-2:204' },
	{ source: 'floor-4', target: 'ufjf:ice:floor-2:205' },
];


function setFloorsDB() {
	floors.forEach(item => {
		setDoc(doc(firestoreDatabase, 'ICs', item.id), {
			...item
		})
	})
}

function setBuildingsDB() {
	buildings.forEach(item => {
		setDoc(doc(firestoreDatabase, 'ICs', item.id), {
			...item
		})
	})
}

function setRelationshipDB() {
	initialEdges.forEach(item => {
		addDoc(collection(firestoreDatabase, 'relationship'), {
			...item
		})
	})
}

export {
	buildings,
	floors,
	rooms,
	allNodes,
	initialEdges,
	setFloorsDB,
	setBuildingsDB,
	setRelationshipDB,
}
