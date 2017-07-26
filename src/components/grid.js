import codeUtilities from '../utilities/codeUtilities'
import tile from './tile'
import store from '../../store'

export default () => {
	let { includeNegativeQuadrants, gridSize } = store.mainHoundstooth.basePattern.gridSettings || {}
	const { iterator } = codeUtilities

	if (includeNegativeQuadrants) {
		iterator(gridSize * 2).forEach(x => {
			iterator(gridSize * 2).forEach(y => {
				tile({ gridAddress: [ x - gridSize, y - gridSize ] })
			})
		})
	}
	else {
		iterator(gridSize).forEach(x => {
			iterator(gridSize).forEach(y => {
				tile({ gridAddress: [ x, y ] })
			})
		})
	}
}
