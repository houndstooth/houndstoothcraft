import { Color, parseColor } from '../../pattern'
import { getCurrentContext } from '../canvas'

const buildFill: (_: { shapeColor: Color }) => void =
	({ shapeColor }: { shapeColor: Color}): void => {
		const context: CanvasRenderingContext2D = getCurrentContext.default()

		context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

		context.fillStyle = parseColor.default(shapeColor)
	}

export default buildFill
