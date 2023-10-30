

export function getDeepLocation(rawLocation) {

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

