import { CANVAS_SIZE } from '../../constants'
import { Context } from '../dom'

const clearContext: (_: Context) => void =
	(context: Context): void =>
		// tslint:disable-next-line:no-unsafe-any
		context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

export default clearContext
