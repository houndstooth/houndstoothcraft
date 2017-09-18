import { applyView } from '../view'
import fill from './fill'

export default ({ context, shapeColor, outline }) => {
	if (outline.length < 3) return
	outline = applyView(outline)

	fill({ context, shapeColor, outline })
}
