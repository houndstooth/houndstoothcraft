import tile from './tile'
import state from '../../state'
import render from '../render'
import display from '../display'
import codeUtilities from '../utilities/codeUtilities'

export default () => {
	let { includeNegativeQuadrants, gridSize } = state.mainHoundstooth.basePattern.gridSettings || {}
	const { iterator } = codeUtilities

	render.applyOpacity()
	display.applyBackgroundColor()

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
