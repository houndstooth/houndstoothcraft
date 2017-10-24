import { getCurrentContext } from '../canvas'
import { parseColor } from './parseColor'

const buildFill = ({ shapeColor }) => {
	const context = getCurrentContext()

	context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

	context.fillStyle = parseColor(shapeColor)
}

export { buildFill }
