import { Outline } from '../space'
import { applyView } from '../view'
import { Context } from '../page'
import fill from './fill'
import { Color } from './types'

const draw: {
	({}: { context: Context, shapeColor: Color, outline: Outline }): void,
} = ({ context, shapeColor, outline }) => {
	if (outline.length < 3) {
		return
	}
	const outlineAdjustedForView = applyView(outline)

	fill({ context, shapeColor, outline: outlineAdjustedForView })
}

export default draw
