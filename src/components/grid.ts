import { getFromBaseOrDefaultPattern, GridSettings } from '../store'
import { iterator } from '../utilities/codeUtilities'
import * as to from '../utilities/to'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'
import { applyBackgroundColor, applyOpacity } from '../view'
import { tile } from './tile'

const NEGATIVE_AND_POSITIVE = 2

const grid: NullarySideEffector = () => {
	const { includeNegativeQuadrants, gridSize }: GridSettings = getFromBaseOrDefaultPattern('grid')

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
