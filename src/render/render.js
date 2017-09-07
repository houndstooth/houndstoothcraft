import applyView from '../render/applyView'
import fill from '../render/fill'

export default ({ context, shapeColor, outline }) => {
	if (outline.length < 3) return
	outline = applyView(outline)

	fill({ context, shapeColor, outline })
}
