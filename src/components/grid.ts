import { state } from '../state'
import { iterator } from '../utilities/codeUtilities'
import { NullarySideEffector } from '../utilities/types'
import { applyBackgroundColor, applyOpacity } from '../view'
import { tile } from './tile'
import { Address } from './types'

const NEGATIVE_AND_POSITIVE = 2

const grid: NullarySideEffector = (() => {
	const { includeNegativeQuadrants, gridSize = 0 } = state.mainHoundstooth.basePattern.gridSettings

	applyOpacity()
	applyBackgroundColor()

	if (includeNegativeQuadrants) {
		iterator(gridSize * NEGATIVE_AND_POSITIVE).forEach(x => {
			iterator(gridSize * NEGATIVE_AND_POSITIVE).forEach(y => {
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

export { grid }
