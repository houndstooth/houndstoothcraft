import { Context } from '../../page'
import { Outline } from '../../space'

type Solid = (_: {
	context: Context,
	outline: Outline,
	shapeColorIndex: number,
}) => void

export { Solid }
