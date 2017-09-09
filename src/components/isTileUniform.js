import render from '../render'
import codeUtilities from '../utilities/codeUtilities'

export default ({ tileColorIndices }) => {
	for (let i = 0; i < tileColorIndices.length - 1; i++) {
		const colorOne = render.getColor({ index: tileColorIndices[ i ] })
		const colorTwo = render.getColor({ index: tileColorIndices[ i + 1 ] })
		if (!codeUtilities.shallowEqual(colorOne, colorTwo)) return false
	}
	return true
}
