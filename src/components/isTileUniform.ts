import { Color, getColor } from '../render'
import { shallowEqual } from '../utilities/codeUtilities'
import { ShapeColorIndex } from './types'

const isTileUniform: (_: { shapeColorIndices: ShapeColorIndex[] }) => boolean =
	({ shapeColorIndices }: { shapeColorIndices: ShapeColorIndex[] }): boolean => {
		for (let i: number = 0; i < shapeColorIndices.length - 1; i++) {
			const colorOne: Color = getColor({ index: shapeColorIndices[ i ] })
			const colorTwo: Color = getColor({ index: shapeColorIndices[ i + 1 ] })
			if (!shallowEqual(colorOne, colorTwo)) {
				return false
			}
		}

		return true
	}

export { isTileUniform }
