
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
import { Data } from './Controllers/Data';



const NODE_TYPES = {
	Master: Master,
	Building: Building,
	Floor: Floor,
	Room: Room,
}


function mergeData(oldData, newData) {
	const mergeSet = {}

	oldData.forEach(data => mergeSet[data.id] = {...data})
	newData.forEach(data => mergeSet[data.id] = {...data})

	return Object.values(mergeSet)
}


export default function App() {
	
    const [nodes, setNodes] = useState([]);
	const [edges, setEdges] = useState([]);

	const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
	const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

	const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


	useEffect(() => {
		function onUpdate(ICs) {
			setNodes(old => mergeData(old, ICs))
		}

		const unsubscribe = Data().getICs(onUpdate)
		return () => unsubscribe
	}, [])

	useEffect(() => {
		function onUpdate(services) {
			setNodes(old => mergeData(old, services))
		}

		const unsubscribe = Data().getServices(onUpdate)
		return () => unsubscribe
	}, [])

	useEffect(() => {
		Data().getRelationships().then(
			data => setEdges(data)
		)
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
				panOnDrag={[1, 2]}
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

