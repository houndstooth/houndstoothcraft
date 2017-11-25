import { Color, parseColor } from '../../pattern'
import { Context } from '../page'
import { main as getCurrentContext } from './getCurrentContext'

const buildFill: (_: { shapeColor: Color }) => void =
	({ shapeColor }: { shapeColor: Color}): void => {
		const context: Context = getCurrentContext()

		context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

		context.fillStyle = parseColor.main(shapeColor)
	}

export { buildFill as main }
