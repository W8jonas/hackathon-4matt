
import { getPosition } from "./getPosition"

export function mergeData(oldData, newData) {
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
