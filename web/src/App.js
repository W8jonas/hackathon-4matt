
import { useState } from 'react';

import ReactFlow, {
	Background,
	Controls,
	MiniMap,
	SelectionMode,
} from 'reactflow';
import { Master } from './components/Master';


const initialNodes = [
	{
		id: '2378230',
		position: { x: 0, y: 0 },
		data: { label: 'UFJF Central' },
		type: 'Master',
        draggable: true,
	}
];

const initialEdges = [
];

const NODE_TYPES = {
	master: Master,

}
const panOnDrag = [1, 2];

export default function App() {
	
    const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);


	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			
			<ReactFlow
				nodeTypes={NODE_TYPES}
				nodes={nodes}
				edges={edges}
				
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

