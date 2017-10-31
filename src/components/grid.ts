import { getFromBaseOrDefaultPattern, GridSettings } from '../store'
import { iterator } from '../utilities/codeUtilities'
import * as to from '../utilities/to'
import { NullarySideEffector } from '../utilities/types'
import { applyBackgroundColor, applyOpacity } from '../view'
import { maybeTile } from './maybeTile'

const NEGATIVE_AND_POSITIVE: number = 2

const grid: NullarySideEffector =
	(): void => {
		const { includeNegativeQuadrants, gridSize }: GridSettings = getFromBaseOrDefaultPattern('gridSettings')

		applyOpacity()
		applyBackgroundColor()

		if (includeNegativeQuadrants) {
			iterator(gridSize * NEGATIVE_AND_POSITIVE).forEach((x: number): void => {
				iterator(gridSize * NEGATIVE_AND_POSITIVE).forEach((y: number): void => {
					maybeTile({ gridAddress: to.Address([ x - gridSize, y - gridSize ]) })
				})
			})
		}
		else {
			iterator(gridSize).forEach((x: number): void => {
				iterator(gridSize).forEach((y: number): void => {
					maybeTile({ gridAddress: to.Address([ x, y ]) })
				})
			})
		}
	}

export { grid }
