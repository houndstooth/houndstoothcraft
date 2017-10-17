import state from '../state'
import { iterator } from '../utilities/codeUtilities'
import { NullarySideEffector } from '../utilities/types'
import { applyBackgroundColor, applyOpacity } from '../view'
import tile from './tile'
import { Address } from './types'

const grid: NullarySideEffector = (() => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const gridSettings = basePattern.gridSettings || {}
	const { includeNegativeQuadrants, gridSize = 0 } = gridSettings

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
