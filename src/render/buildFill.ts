import { getCurrentContext } from '../canvas'
import { parseColor } from './parseColor'
import { Color } from './types'

const buildFill: (_: { shapeColor: Color }) => void = ({ shapeColor }) => {
	const context = getCurrentContext()

	context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

	context.fillStyle = parseColor(shapeColor)
}

export { buildFill }
