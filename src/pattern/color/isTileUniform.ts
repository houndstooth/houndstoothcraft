import { Color } from '../../types'
import { codeUtilities } from '../../utilities'
import getColor from './getColor'
import { ShapeColorIndex } from './types'

const isTileUniform: (_: { shapeColorIndices: ShapeColorIndex[] }) => boolean =
	({ shapeColorIndices }: { shapeColorIndices: ShapeColorIndex[] }): boolean => {
		for (let i: number = 0; i < shapeColorIndices.length - 1; i++) {
			const colorOne: Color = getColor({ index: shapeColorIndices[ i ] })
			const colorTwo: Color = getColor({ index: shapeColorIndices[ i + 1 ] })
			if (!codeUtilities.shallowEqual(colorOne, colorTwo)) {
				return false
			}
		}

		return true
	}

export default isTileUniform
