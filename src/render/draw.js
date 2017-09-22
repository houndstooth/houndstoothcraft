import { applyView } from '../view'
import fill from './fill'

const draw = ({ context, shapeColor, outline }) => {
	if (outline.length < 3) return
	outline = applyView(outline)

	fill({ context, shapeColor, outline })
}

export default draw
