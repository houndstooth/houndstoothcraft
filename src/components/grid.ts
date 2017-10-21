import { state } from '../state'
import * as to from '../to'
import { iterator } from '../utilities/codeUtilities'
import { NullarySideEffector } from '../utilities/types'
import { applyBackgroundColor, applyOpacity } from '../view'
import { tile } from './tile'

const NEGATIVE_AND_POSITIVE = 2

const grid: NullarySideEffector = () => {
	const { includeNegativeQuadrants, gridSize = 0 } = state.mainHoundstooth.basePattern.gridSettings

	applyOpacity()
	applyBackgroundColor()

	if (includeNegativeQuadrants) {
		iterator(gridSize * NEGATIVE_AND_POSITIVE).forEach(x => {
			iterator(gridSize * NEGATIVE_AND_POSITIVE).forEach(y => {
				tile({ gridAddress: to.Address([ x - gridSize, y - gridSize ]) })
			})
		})
	}
	else {
		iterator(gridSize).forEach(x => {
			iterator(gridSize).forEach(y => {
				tile({ gridAddress: to.Address([ x, y ]) })
			})
		})
	}
}

export { grid }
