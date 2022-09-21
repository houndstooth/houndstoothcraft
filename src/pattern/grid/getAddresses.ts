import { codeUtilities, to } from '../../utilities'
import { patternState } from '../patternState'

import { GridSettings } from './gridSettings'
import { Address, Grid } from './types'

const NEGATIVE_AND_POSITIVE: number = 2

const getAddresses: () => Grid<Address> =
	(): Grid<Address> => {
		const { includeNegativeQuadrants, tileResolution }: GridSettings = patternState.gridSettings

		let adjustedTileResolution: number = tileResolution
		let gridOffset: number = 0

		if (includeNegativeQuadrants) {
			adjustedTileResolution *= NEGATIVE_AND_POSITIVE
			gridOffset -= tileResolution
		}

		return codeUtilities.iterator(adjustedTileResolution).map((x: number): Address[] =>
			codeUtilities.iterator(adjustedTileResolution).map((y: number): Address =>
				to.Address([ x + gridOffset, y + gridOffset ])))
	}

export default getAddresses
