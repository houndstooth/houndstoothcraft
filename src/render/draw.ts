import { Outline } from '../space'
import { applyView } from '../view'
import fill from './fill'
import { Color } from './types'

type Draw = { ({}: { context: CanvasRenderingContext2D, shapeColor: Color, outline: Outline }): void }

const draw: Draw = ({ context, shapeColor, outline }) => {
	if (outline.length < 3) {
		return
	}
	outline = applyView(outline)

	fill({ context, shapeColor, outline })
}

export default draw
