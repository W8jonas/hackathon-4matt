
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
import { Backdrop, CircularProgress } from '@mui/material';

// Componentes visuais
import { Master } from './components/Master';
import { Building } from './components/Building';
import { Floor } from './components/Floor';
import { Room } from './components/Room';
import { Data } from './Controllers/Data';
import { Header } from './components/Header';

// Utils
import { getLayoutedElements } from './utils/treeLayout';
import { getDeepLocation } from './utils/getDeepLocation';
import { mergeData } from './utils/mergeData';


const NODE_TYPES = {
	Master: Master,
	Building: Building,
	Floor: Floor,
	Room: Room,
}


export default function App() {
	const { fitView } = useReactFlow();

	const [nodes, setNodes] = useState([]);
	const [edges, setEdges] = useState([]);
	const [loading, setLoading] = useState(true)
	const [serviceNowActive, setServiceNowActive] = useState(false)
	const [webhookSiteActive, setWebhookSiteActive] = useState(false)

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

	useEffect(() => {
		if (nodes.length > 0) {

			nodes.forEach(service => {
				if (service.data.color === 'red' || service.data.color === 'orange') {

					const deepFullLocation = getDeepLocation(service.data.id)

					const bodyData = {
						...service.data,
						rawLocation: service.data.id.replaceAll(':', ' → '),
						deepFullLocation: deepFullLocation,
						timestamp: service.data.updatedAt.seconds,
						timestampString: new Date(service.data.updatedAt.seconds).toISOString(),
						color: undefined,
						position: undefined,
						updatedAt: undefined,
						status: service.data.status.trim(),
						description: `Incidente criado automático - Sala ${service.data.label} - Localizado no pavimento ${deepFullLocation.children.children.entityName} - do prédio ${deepFullLocation.children.entityName} - criticidade: ${service.data.criticity}`,
					}

					if (webhookSiteActive) {
						fetch('https://webhook.site/bf27f73c-fa0d-4541-aed8-f12c3361d0b6', {
							method: 'POST',
							mode: 'no-cors',
							body: JSON.stringify(bodyData)
						})
					}

					if (serviceNowActive) {
						fetch('https://webhook.site/bf27f73c-fa0d-4541-aed8-f12c3361d0b6', {
							method: 'POST',
							mode: 'no-cors',
							body: {
								caller_id: "4490693e1b42f1d034255311604bcb14",
								short_description: "UFJF - Grupo 3 - (Jonas Henrique e Caio) - Incidente hackathon", 
								description: `
								incidente criado automático - [nome do processo] - hospedado em  [nome do host] - virtualizado por [nome do servidor] - criticidade: [criticidade]`, 
								category: "software", 
								work_notes: `Data de parada: ${bodyData.timestampString}`,
								allEventData: bodyData
							}
						})
					}
				}
			})
		}

	}, [nodes, serviceNowActive, webhookSiteActive])

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Header
				onLayoutClick={onLayout}
				serviceNowActive={serviceNowActive}
				onActiveServiceNow={option => setServiceNowActive(option.target.checked)}
				webhookSiteActive={webhookSiteActive}
				onActiveWebhookSite={option => setWebhookSiteActive(option.target.checked)}
			/>

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

