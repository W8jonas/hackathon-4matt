
import { useState, useCallback, useEffect } from 'react';

import ReactFlow, {
	Background,
	Controls,
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
	MiniMap,
	SelectionMode,
	useReactFlow,
	Panel
} from 'reactflow';

import { Master } from './components/Master';
import { Building } from './components/Building';
import { Floor } from './components/Floor';
import { Room } from './components/Room';
import { Data } from './Controllers/Data';
import { getLayoutedElements } from './utils/treeLayout';
import { setRelationshipDB } from './database';
import { Header } from './components/Header';



const NODE_TYPES = {
	Master: Master,
	Building: Building,
	Floor: Floor,
	Room: Room,
}

function getPosition(array, thisId) {
	const dd = array.find(item => item.id === thisId)
	return dd?.position ? {...dd.position } : {}
}

function mergeData(oldData, newData) {
	const mergeSet = {}

	oldData.forEach(data => mergeSet[data.id] = { ...data })
	newData.forEach(data => {
		
		mergeSet[data.id] = { 
			...data, 
			position: {
				x: getPosition(newData, data.id).x || getPosition(oldData, data.id).x || 0,
				y: getPosition(newData, data.id).y || getPosition(oldData, data.id).y || 0,
			}
		}
	})

	return Object.values(mergeSet)
}

// setRelationshipDB()

export default function App() {
	const { fitView } = useReactFlow();

	const [nodes, setNodes] = useState([]);
	const [edges, setEdges] = useState([]);

	const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
	const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

	const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

	const onLayout = useCallback(
		(direction) => {
			const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, {
				direction,
			});

			setNodes([...layoutedNodes]);
			setEdges([...layoutedEdges]);

			window.requestAnimationFrame(() => {
				fitView();
			});
		},
		[nodes, edges]
	);

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
			<Header onLayoutClick={onLayout} />

			<div style={{ height: 'calc(100vh - 69px)', width: '100vw', position: 'relative' }}>
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
					fitView
					nodesFocusable={true}
				>
					<Background />
					<Controls />
				</ReactFlow>
			</div>
		</div>
	);
}

