import ctx from './ctx'
import parseColor from './parseColor'

export default ({ color, coordinates, customContext }) => {
	if (!coordinates.length) return

	const context = customContext ? customContext : ctx

	context.fillStyle = parseColor({ color })
	context.beginPath()

	context.moveTo(coordinates[ 0 ][ 0 ], coordinates[ 0 ][ 1 ])
	coordinates.forEach(coordinate => context.lineTo(coordinate[ 0 ], coordinate[ 1 ]))

	context.closePath()
	context.fill()
}