import parseColor from './parseColor'
import buildPath from './buildPath'
import fillPath from './fillPath'

const fill = ({ context, shapeColor, outline }) => {
	context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

	context.fillStyle = parseColor(shapeColor)

	buildPath({ context, outline })

	fillPath({ context })
}

export default fill
