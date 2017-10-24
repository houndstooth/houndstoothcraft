import { fill, getColor } from '../render'
import { Solid } from './types'

const solid: Solid = ({ outline, shapeColorIndex }) => {
	const shapeColor = getColor({ index: shapeColorIndex || 0 })
	if (shapeColor.a === 0) {
		return
	}

	fill({ outline, shapeColor })
}

export { solid }
