import draw from './draw'
import getColor from './getColor'

export default ({ context, outline, shapeColorIndex }) => {
	const shapeColor = getColor({ index: shapeColorIndex })
	if (shapeColor.a === 0) return

	draw({ context, shapeColor, outline })
}
