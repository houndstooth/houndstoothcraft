import render from '../render/render'
import colorUtilities from '../utilities/colorUtilities'

export default ({ context, outline, shapeColorIndex, tileOrigin, tileSize }) => {
	const shapeColor = colorUtilities.getColor({ index: shapeColorIndex })
	if (shapeColor.a === 0) return

	render({ context, shapeColor, outline, tileOrigin, tileSize })
}
