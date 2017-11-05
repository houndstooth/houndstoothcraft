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

		const { includeNegativeQuadrants, tileResolution }: GridSettings = getFromBaseOrDefaultPattern('gridSettings')

		let adjustedTileResolution: number = tileResolution
		let gridOffset: number = 0
		let tileCount: number = tileResolution * tileResolution

		if (includeNegativeQuadrants) {
			adjustedTileResolution *= NEGATIVE_AND_POSITIVE
			gridOffset -= tileResolution
			tileCount *= QUADRANT_COUNT
		}

		state.tileCount = tileCount

		iterator(adjustedTileResolution).forEach((x: number): void => {
			iterator(adjustedTileResolution).forEach((y: number): void => {
				gridTile({ gridAddress: to.Address([ x + gridOffset, y + gridOffset ]) })
			})
		})
	}

export { grid }
