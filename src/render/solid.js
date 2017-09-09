import draw from './draw'
import colorUtilities from '../utilities/colorUtilities'

export default ({ context, outline, shapeColorIndex }) => {
	const shapeColor = colorUtilities.getColor({ index: shapeColorIndex })
	if (shapeColor.a === 0) return

	draw({ context, shapeColor, outline })
}
