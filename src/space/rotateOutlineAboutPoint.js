const rotateCoordinateAboutPoint = ({ coordinate, point, rotation }) => {
	const sin = Math.sin(rotation)
	const cos = Math.cos(rotation)

	const relativeX = coordinate[ 0 ] - point[ 0 ]
	const relativeY = coordinate[ 1 ] - point[ 1 ]

	return [
		point[ 0 ] + relativeX * cos - relativeY * sin,
		point[ 1 ] + relativeX * sin + relativeY * cos,
	]
}

export default ({ outline, point, rotation }) => {
	return outline.map(coordinate => rotateCoordinateAboutPoint({ coordinate, point, rotation }))
}