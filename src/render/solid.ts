import draw from './draw'
import getColor from './getColor'
import RenderFunction from './RenderFunction'

const solid: RenderFunction = ({ context, outline, shapeColorIndex }) => {
	const shapeColor = getColor({ index: shapeColorIndex })
	if (shapeColor.a === 0) {
		return
	}

	draw({ context, shapeColor, outline })
}

export default solid
