import { getSetting } from '../../app'
import { state } from '../../state'
import * as to from '../../to'
import { codeUtilities } from '../../utilities'
import { applyViewForGrid } from '../view'
import { GridSettings } from './gridSettings'
import { ReferencedGridAddress } from './types'

const NEGATIVE_AND_POSITIVE: number = 2
const QUADRANT_COUNT: number = NEGATIVE_AND_POSITIVE * NEGATIVE_AND_POSITIVE

const grid: (_: { gridTile: (_: ReferencedGridAddress) => void, thisPatternRef: number }) => void =
	({ gridTile, thisPatternRef }: { gridTile: (_: ReferencedGridAddress) => void, thisPatternRef: number }): void => {
		applyViewForGrid.default()

		const { includeNegativeQuadrants, tileResolution }: GridSettings = getSetting.default('gridSettings')

		let adjustedTileResolution: number = tileResolution
		let gridOffset: number = 0
		let tileCount: number = tileResolution * tileResolution

		if (includeNegativeQuadrants) {
			adjustedTileResolution *= NEGATIVE_AND_POSITIVE
			gridOffset -= tileResolution
			tileCount *= QUADRANT_COUNT
		}

		state.tileCount = tileCount

		codeUtilities.iterator(adjustedTileResolution).forEach((x: number): void => {
			codeUtilities.iterator(adjustedTileResolution).forEach((y: number): void => {
				gridTile({ gridAddress: to.Address([ x + gridOffset, y + gridOffset ]), thisPatternRef })
			})
		})
	}

export default grid
