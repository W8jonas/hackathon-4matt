
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
} from 'reactflow';

import { Master } from './components/Master';
import { Building } from './components/Building';
import { Floor } from './components/Floor';
import { Room } from './components/Room';
import { Data } from './Controllers/Data';
import { getLayoutedElements } from './utils/treeLayout';
import { setRelationshipDB } from './database';
import { Header } from './components/Header';
import { Backdrop, CircularProgress } from '@mui/material';



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

function getDeepLocation(rawLocation) {

	function getLocation(actualLocation, _location) {
		if (_location.includes(':')) {
			return {
				...actualLocation,
				entityName: _location.split(':')[0],
				children: getLocation({}, _location.substr(Array.from(_location).findIndex(_letter => _letter === ':') + 1))
			}
        }

		return {
			entityName: _location.split(':')[0],
			children: null
		}
	}
	return getLocation({}, rawLocation)
}

export default function App() {
	const { fitView } = useReactFlow();

	const [nodes, setNodes] = useState([]);
	const [edges, setEdges] = useState([]);
	const [loading, setLoading] = useState(true)

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
			
			services.forEach(service => {
				if (service.data.color === 'red' || service.data.color === 'orange') {
					console.log('Warning', service)

					// fetch('https://webhook.site/bf27f73c-fa0d-4541-aed8-f12c3361d0b6', {
					// 	method: 'POST',
					// 	mode: 'no-cors',
					// 	body: JSON.stringify({
					// 		...service.data,
					// 		rawLocation: service.data.id.replaceAll(':', ' → '),
					// 		deepFullLocation: getDeepLocation(service.data.id),
					// 		timestamp: service.data.updatedAt.seconds,
					// 		timestampString: new Date(service.data.updatedAt.seconds).toISOString(),
					// 		color: undefined,
					// 		position: undefined,
					// 		updatedAt: undefined,
					// 		status: service.data.status.trim(),
					// 	})
					// })
				}
			})
		}

		const unsubscribe = Data().getServices(onUpdate)
		return () => unsubscribe
	}, [])

	useEffect(() => {
		Data().getRelationships().then(
			data => {
				setEdges(data)
				setTimeout(() => {
					document.querySelector('#layout-button').click()
				}, 2000);
				setTimeout(() => {
					setLoading(false)
				}, 3000);
			}
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
					<MiniMap />
				</ReactFlow>
			</div>

			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}

