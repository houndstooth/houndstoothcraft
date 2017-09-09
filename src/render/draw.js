import outlines from '../outlines'
import fill from './fill'

export default ({ context, shapeColor, outline }) => {
	if (outline.length < 3) return
	outline = outlines.applyView(outline)

	fill({ context, shapeColor, outline })
}
