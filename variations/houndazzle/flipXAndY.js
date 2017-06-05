export default ({ coordinates, origin }) => {
	return coordinates.map(coordinate => {
		const relativeX = coordinate[ 0 ] - origin[ 0 ]
		const relativeY = coordinate[ 1 ] - origin[ 1 ]
		return [ origin[ 0 ] + relativeY, origin[ 1 ] + relativeX ]
	})
}
