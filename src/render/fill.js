import colorUtilities from '../utilities/colorUtilities'
import buildPath from './buildPath'
import fillPath from './fillPath'

export default ({ context, shapeColor, outline }) => {
	context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

	context.fillStyle = colorUtilities.parseColor(shapeColor)

	buildPath({ context, outline })

	fillPath({ context })
}
