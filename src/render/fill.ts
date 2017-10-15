import { Outline } from '../space'
import { Context } from '../page'
import parseColor from './parseColor'
import buildPath from './buildPath'
import fillPath from './fillPath'
import { Color } from './types'

type Fill = { ({}: { context: Context, shapeColor: Color, outline: Outline }): void }

const fill: Fill = ({ context, shapeColor, outline }) => {
	context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over'

	context.fillStyle = parseColor(shapeColor)

	buildPath({ context, outline })

	fillPath({ context })
}

export default fill
