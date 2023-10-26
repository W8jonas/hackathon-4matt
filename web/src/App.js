
import { useState, useCallback, useEffect } from 'react';

import ReactFlow, {
	Background,
	Controls,
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
	MiniMap,
	SelectionMode,
} from 'reactflow';

import { Master } from './components/Master';
import { Building } from './components/Building';
import { Floor } from './components/Floor';
import { Room } from './components/Room';


const Buildings = [
	{
		id: 'Building-1',
		position: { x: -400, y: 120 },
		data: { label: 'Prédio ICE' },
		type: 'Building',
        draggable: true,
	},
	{
		id: 'Building-2',
		position: { x: 400, y: 120 },
		data: { label: 'Prédio Computação' },
		type: 'Building',
        draggable: true,
	},
]

const floors = [
	{
		id: 'Floor-1',
		position: { x: -600, y: 240 },
		data: { label: 'Primeiro andar' },
		type: 'Floor',
        draggable: true,
	},
	{
		id: 'Floor-2',
		position: { x: -400, y: 240 },
		data: { label: 'Segundo andar' },
		type: 'Floor',
        draggable: true,
	},
	{
		id: 'Floor-3',
		position: { x: -200, y: 240 },
		data: { label: 'Terceiro andar' },
		type: 'Floor',
        draggable: true,
	},
	{
		id: 'Floor-4-',
		position: { x: -200, y: 240 },
		data: { label: 'Quarto andar' },
		type: 'Floor',
        draggable: true,
	},
	{
		id: 'Floor-4',
		position: { x: 200, y: 240 },
		data: { label: 'Primeiro andar' },
		type: 'Floor',
        draggable: true,
	},
	{
		id: 'Floor-5',
		position: { x: 400, y: 240 },
		data: { label: 'Segundo andar' },
		type: 'Floor',
        draggable: true,
	},
	{
		id: 'Floor-6',
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
	{ id: 'e-2', source: 'master-1', target: 'Building-1' },
	{ id: 'e1-2', source: 'master-1', target: 'Building-2' },
	
	{ id: 'e1-2', source: 'Building-1', target: 'Floor-1' },
	{ id: 'e1-2', source: 'Building-1', target: 'Floor-2' },
	{ id: 'e1-2', source: 'Building-1', target: 'Floor-3' },
		
	{ id: 'e1-2', source: 'Building-2', target: 'Floor-4' },
	{ id: 'e1-2', source: 'Building-2', target: 'Floor-5' },
	{ id: 'e1-2', source: 'Building-2', target: 'Floor-6' },
	

	{ id: 'e1-2', source: 'Floor-1', target: 'room-1' },
	{ id: 'e1-2', source: 'Floor-1', target: 'room-2' },
	{ id: 'e1-2', source: 'Floor-1', target: 'room-3' },
	{ id: 'e1-2', source: 'Floor-1', target: 'room-4' },
];


const NODE_TYPES = {
	Master: Master,
	Building: Building,
	Floor: Floor,
	Room: Room,
}
const panOnDrag = [1, 2];

export default function App() {
	
    const [nodes, setNodes] = useState(allNodes);
	const [edges, setEdges] = useState(initialEdges);

	const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
	const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

	const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


	useEffect(() => {
		
	}, [])

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<ReactFlow
				nodeTypes={NODE_TYPES}
				nodes={nodes}
				onNodesChange={onNodesChange}
				edges={edges}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				
				panOnScroll
				selectionOnDrag={true}
				panOnDrag={panOnDrag}
				selectionMode={SelectionMode.Partial}
				selectNodesOnDrag={true}
				
				nodesFocusable={true}
			>
				<Background />
				<Controls />
				<MiniMap />
			</ReactFlow>
		</div>
	);
}

