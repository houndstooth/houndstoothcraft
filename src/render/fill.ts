import { Context } from '../page'
import { buildPath } from './buildPath'
import { fillPath } from './fillPath'
import { parseColor } from './parseColor'
import { Color, Path } from './types'

const fill: (_: {
	context: Context, path: Path, shapeColor: Color,
}) => void = ({ context, path, shapeColor }) => {
	context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

	context.fillStyle = parseColor(shapeColor)

	buildPath({ context, path })

	fillPath({ context })
}

export { fill }
