import context from './context'
import colorUtilities from '../utilities/colorUtilities'

export default ({ shapeColor, coordinates }) => {
	if (coordinates.length < 3) return

	context.fillStyle = colorUtilities.parseColor(shapeColor)
	context.beginPath()

	context.moveTo(coordinates[ 0 ][ 0 ], coordinates[ 0 ][ 1 ])
	coordinates.slice(1).forEach(coordinate => context.lineTo(coordinate[ 0 ], coordinate[ 1 ]))

	context.closePath()
	context.fill()
}
