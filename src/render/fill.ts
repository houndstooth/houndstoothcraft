import { Context } from '../page'
import { Outline } from '../space'
import buildPath from './buildPath'
import fillPath from './fillPath'
import parseColor from './parseColor'
import { Color } from './types'

const fill: {
	({}: { context: Context, outline: Outline, shapeColor: Color}): void,
} = ({ context, outline, shapeColor }) => {
	context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

	context.fillStyle = parseColor(shapeColor)

	buildPath({ context, outline })

	fillPath({ context })
}

export default fill
