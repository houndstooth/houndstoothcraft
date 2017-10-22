import { getColor } from '../render'
import { shallowEqual } from '../utilities/codeUtilities'
import { ShapeColorIndex } from './types'

const isTileUniform: (_: { shapeColorIndices: ShapeColorIndex[] }) => boolean = ({ shapeColorIndices }) => {
	for (let i = 0; i < shapeColorIndices.length - 1; i++) {
		const colorOne = getColor({ index: shapeColorIndices[ i ] })
		const colorTwo = getColor({ index: shapeColorIndices[ i + 1 ] })
		if (!shallowEqual(colorOne, colorTwo)) {
			return false
		}
	}

	return true
}

export { isTileUniform }
