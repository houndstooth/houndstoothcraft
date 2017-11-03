import { state } from '../state'
import { getFromBaseOrDefaultPattern, GridSettings } from '../store'
import { iterator } from '../utilities/codeUtilities'
import * as to from '../utilities/to'
import { applyViewForGrid } from '../view'
import { GridAddressFunction } from './types'

const NEGATIVE_AND_POSITIVE: number = 2
const QUADRANT_COUNT: number = NEGATIVE_AND_POSITIVE * NEGATIVE_AND_POSITIVE

const grid: (_: { gridTile: GridAddressFunction }) => void =
	({ gridTile }: { gridTile: GridAddressFunction }): void => {
		applyViewForGrid()

		const { includeNegativeQuadrants, gridSize }: GridSettings = getFromBaseOrDefaultPattern('gridSettings')

		let adjustedGridSize: number = gridSize
		let gridOffset: number = 0
		let tileCount: number = gridSize * gridSize

		if (includeNegativeQuadrants) {
			adjustedGridSize *= NEGATIVE_AND_POSITIVE
			gridOffset -= gridSize
			tileCount *= QUADRANT_COUNT
		}

		state.tileCount = tileCount

		iterator(adjustedGridSize).forEach((x: number): void => {
			iterator(adjustedGridSize).forEach((y: number): void => {
				gridTile({ gridAddress: to.Address([ x + gridOffset, y + gridOffset ]) })
			})
		})
	}

export { grid }
