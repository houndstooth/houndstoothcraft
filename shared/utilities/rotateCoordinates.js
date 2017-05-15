export default ({ origin, coordinates, rotation }) => {
	return coordinates.map(coordinate => {
		const sin = Math.sin(rotation)
		const cos = Math.cos(rotation)

		const offsetX = coordinate[ 0 ] - origin[ 0 ]
		const offsetY = coordinate[ 1 ] - origin[ 1 ]

		return [
			origin[ 0 ] + offsetX * cos - offsetY * sin,
			origin[ 1 ] + offsetX * sin + offsetY * cos
		]
	})
}
