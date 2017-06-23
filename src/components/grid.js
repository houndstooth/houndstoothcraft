import codeUtilities from '../utilities/codeUtilities'
import state from '../state/state'
import tile from './tile'

export default () => {
	const { gridSize, includeNegativeQuadrants } = state.gridConfig
	const { iterator } = codeUtilities

	if (includeNegativeQuadrants) {
		iterator(gridSize * 2).forEach(x => {
			iterator(gridSize * 2).forEach(y => {
				tile({ address: [ x - gridSize, y - gridSize ] })
			})
		})
	} else {
		iterator(gridSize).forEach(x => {
			iterator(gridSize).forEach(y => {
				tile({ address: [ x, y ] })
			})
		})
	}
}
