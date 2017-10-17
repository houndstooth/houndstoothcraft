import { Context } from '../page'
import { Outline } from '../space'
import { applyView } from '../view'
import fill from './fill'
import { Color } from './types'

const draw: (_: {
	context: Context, outline: Outline, shapeColor: Color,
}) => void = ({ context, outline, shapeColor }) => {
	if (outline.length < 3) {
		return
	}
	const outlineAdjustedForView = applyView(outline)

	fill({ context, shapeColor, outline: outlineAdjustedForView })
}

export default draw
