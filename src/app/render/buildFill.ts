import { Color, parseColor } from '../../pattern'
import { Context } from '../page'
import { getCurrentContext } from './getCurrentContext'

const buildFill: (_: { shapeColor: Color }) => void =
	({ shapeColor }: { shapeColor: Color}): void => {
		const context: Context = getCurrentContext()

		context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

		context.fillStyle = parseColor(shapeColor)
	}

export { buildFill }
