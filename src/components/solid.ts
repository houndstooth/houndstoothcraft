import { fill, getColor } from '../render'
import { SolidParams } from './types'

const solid: (_: SolidParams) => void = ({ outline, shapeColorIndex }) => {
	const shapeColor = getColor({ index: shapeColorIndex || 0 })
	if (shapeColor.a === 0) {
		return
	}

	fill({ outline, shapeColor })
}

export { solid }
