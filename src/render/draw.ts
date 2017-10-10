import { applyView } from '../view'
import fill from './fill'
import Color from './Color'

type Draw = { ({}: { context: any, shapeColor: Color, outline: number[][] }): void }
const draw: Draw = ({ context, shapeColor, outline }) => {
	if (outline.length < 3) {
		return
	}
	outline = applyView(outline)

	fill({ context, shapeColor, outline })
}

export default draw
