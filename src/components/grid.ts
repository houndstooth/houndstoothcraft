import state from '../state'
import { applyBackgroundColor, applyOpacity } from '../view'
import { iterator } from '../utilities/codeUtilities'
import tile from './tile'
import { NullarySideEffector } from '../utilities/types'
import { Address } from './types'

const grid: NullarySideEffector = (() => {
	const gridSettings = state.mainHoundstooth.basePattern.gridSettings || {}
	const { includeNegativeQuadrants, gridSize } = gridSettings

	applyOpacity()
	applyBackgroundColor()

	if (includeNegativeQuadrants) {
		iterator(gridSize * 2).forEach(x => {
			iterator(gridSize * 2).forEach(y => {
				tile({ gridAddress: [ x - gridSize, y - gridSize ] as Address })
			})
		})
	}
	else {
		iterator(gridSize).forEach(x => {
			iterator(gridSize).forEach(y => {
				tile({ gridAddress: [ x, y ] as Address })
			})
		})
	}
}) as NullarySideEffector

export default grid
