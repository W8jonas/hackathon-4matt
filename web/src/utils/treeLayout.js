
import { stratify, tree } from 'd3-hierarchy';


const g = tree();

export function getLayoutedElements(nodes, edges, options) {
	if (nodes.length === 0) return { nodes, edges };

	const { width, height } = document
		.querySelector(`[data-id="${nodes[0].id}"]`)
		.getBoundingClientRect();

	const hierarchy = stratify()
		.id((node) => node.id)
		.parentId((node) => edges.find((edge) => edge.target === node.id)?.source);

	const root = hierarchy(nodes);
	const layout = g.nodeSize([width / 3, height * 1.5])(root);

	return {
		nodes: layout
			.descendants()
			.map((node) => {
                if (node.depth === 3) {
                    return { ...node.data, position: { x: node.parent.x, y: node?.parent?.y + (220 * (node.id[19]) - 1) - 80 } }
                }
                return { ...node.data, position: { x: node.x, y: node.y } }
            }),
		edges,
	};
};

