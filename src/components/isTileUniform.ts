import { getColor } from '../render'
import { shallowEqual } from '../utilities/codeUtilities'
import { TileColorIndices } from './types'

const isTileUniform: (_: { tileColorIndices: TileColorIndices }) => boolean = ({ tileColorIndices }) => {
	for (let i = 0; i < tileColorIndices.length - 1; i++) {
		const colorOne = getColor({ index: tileColorIndices[ i ] })
		const colorTwo = getColor({ index: tileColorIndices[ i + 1 ] })
		if (!shallowEqual(colorOne, colorTwo)) {
			return false
		}
	}

	return true
}

export default isTileUniform
