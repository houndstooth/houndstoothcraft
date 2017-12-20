import { CANVAS_SIZE } from '../../../constants'
import { from } from '../../../utilities'

const clearContext: (_: CanvasRenderingContext2D) => void =
	(context: CanvasRenderingContext2D): void => {
		context.clearRect(0, 0, from.Px(CANVAS_SIZE), from.Px(CANVAS_SIZE))
	}

export default clearContext
