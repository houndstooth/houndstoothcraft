import { draw } from './draw'
import { getColor } from './getColor'
import { Solid } from './types'

const solid: Solid = ({ context, outline, shapeColorIndex }) => {
	const shapeColor = getColor({ index: shapeColorIndex || 0 })
	if (shapeColor.a === 0) {
		return
	}

	draw({ context, shapeColor, outline })
}

export { solid }
