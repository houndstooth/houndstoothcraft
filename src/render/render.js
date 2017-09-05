import adjustOutlineForViewAndComponentEffects from '../render/adjustOutlineForViewAndComponentEffects'
import fill from '../render/fill'

export default ({ context, shapeColor, outline, tileOrigin, tileSize }) => {
	if (outline.length < 3) return
	outline = adjustOutlineForViewAndComponentEffects(outline, { tileOrigin, tileSize })

	fill({ context, shapeColor, outline })
}
