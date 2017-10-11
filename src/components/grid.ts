import state from '../state'
import { applyBackgroundColor, applyOpacity } from '../view'
import { iterator } from '../utilities/codeUtilities'
import tile from './tile'

const grid: { (): void } = () => {
	const gridSettings = state.mainHoundstooth.basePattern.gridSettings || {}
	const { includeNegativeQuadrants, gridSize } = gridSettings

	applyOpacity()
	applyBackgroundColor()

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

export default grid
