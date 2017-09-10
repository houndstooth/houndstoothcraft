import view from '../view'
import fill from './fill'

export default ({ context, shapeColor, outline }) => {
	if (outline.length < 3) return
	outline = view.applyView(outline)

	fill({ context, shapeColor, outline })
}
