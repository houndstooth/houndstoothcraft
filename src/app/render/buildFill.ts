import { Color, parseColor } from '../../pattern'
import { getCurrentContext } from '../canvas'
import { Context } from '../page'

const buildFill: (_: { shapeColor: Color }) => void =
	({ shapeColor }: { shapeColor: Color}): void => {
		const context: Context = getCurrentContext.default()

		context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

		context.fillStyle = parseColor.default(shapeColor)
	}

export default buildFill
