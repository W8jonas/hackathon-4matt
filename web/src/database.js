const Buildings = [
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
		id: 'floor-4-',
		position: { x: -200, y: 240 },
		data: { label: 'Quarto andar' },
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
	{
		id: 'floor-5',
		position: { x: 400, y: 240 },
		data: { label: 'Segundo andar' },
		type: 'Floor',
        draggable: true,
	},
	{
		id: 'floor-6',
		position: { x: 600, y: 240 },
		data: { label: 'Terceiro andar' },
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
	...Buildings,
	...floors,
	...rooms,
];

const initialEdges = [
	{ source: 'master-1', target: 'building-1' },
	{ source: 'master-1', target: 'building-2' },
	
	{ source: 'building-1', target: 'floor-1' },
	{ source: 'building-1', target: 'floor-2' },
	{ source: 'building-1', target: 'floor-3' },
		
	{ source: 'building-2', target: 'floor-4' },
	{ source: 'building-2', target: 'floor-5' },
	{ source: 'building-2', target: 'floor-6' },
	

	{ source: 'floor-1', target: 'room-1' },
	{ source: 'floor-1', target: 'room-2' },
	{ source: 'floor-1', target: 'room-3' },
	{ source: 'floor-1', target: 'room-4' },
];
