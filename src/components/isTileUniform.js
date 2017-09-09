import getColor from '../render/getColor'
import codeUtilities from '../utilities/codeUtilities'

export default ({ tileColorIndices }) => {
	for (let i = 0; i < tileColorIndices.length - 1; i++) {
		const colorOne = getColor({ index: tileColorIndices[ i ] })
		const colorTwo = getColor({ index: tileColorIndices[ i + 1 ] })
		if (!codeUtilities.shallowEqual(colorOne, colorTwo)) return false
	}
	return true
}
