import colorUtilities from '../utilities/colorUtilities'
import renderUtilities from '../utilities/renderUtilities'

export default ({ context, shapeColor, outline }) => {
	context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

	context.fillStyle = colorUtilities.parseColor(shapeColor)

	renderUtilities.buildPath({ context, outline })

	renderUtilities.fillPath({ context })
}