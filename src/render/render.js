import context from './context'
import colorUtilities from '../utilities/colorUtilities'

export default ({ shapeColor, outline }) => {
	if (outline.length < 3) return

	context.fillStyle = colorUtilities.parseColor(shapeColor)
	context.beginPath()

	context.moveTo(outline[ 0 ][ 0 ], outline[ 0 ][ 1 ])
	outline.slice(1).forEach(coordinate => context.lineTo(coordinate[ 0 ], coordinate[ 1 ]))

	context.closePath()
	context.fill()
}
