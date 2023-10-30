
export function getPosition(array, thisId) {
	const dd = array.find(item => item.id === thisId)
	return dd?.position ? {...dd.position } : {}
}
