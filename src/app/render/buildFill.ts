import { parseColor } from '../../pattern'
import { Color } from '../../types'
import getCurrentContext from './getCurrentContext'

const buildFill: (_: { shapeColor: Color }) => void =
	({ shapeColor }: { shapeColor: Color}): void => {
		const context: CanvasRenderingContext2D = getCurrentContext()

		context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

		context.fillStyle = parseColor.default(shapeColor)
	}

export default buildFill
