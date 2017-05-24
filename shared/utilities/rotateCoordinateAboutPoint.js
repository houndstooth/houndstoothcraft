export default ({ coordinate, point, rotation }) => {
	const sin = Math.sin(rotation)
	const cos = Math.cos(rotation)

	const offsetX = coordinate[ 0 ] - point[ 0 ]
	const offsetY = coordinate[ 1 ] - point[ 1 ]

	return [
		point[ 0 ] + offsetX * cos - offsetY * sin,
		point[ 1 ] + offsetX * sin + offsetY * cos
	]
}
