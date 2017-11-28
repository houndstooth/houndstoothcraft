// tslint:disable:no-unsafe-any

import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { asyncMaybeTile, maybeTile } from '../tile'
import grid from './grid'
import gridComplete from './gridComplete'

const executeGrid: (_: { thisPatternRef: number }) => Promise<void> =
	async ({ thisPatternRef }: { thisPatternRef: number }): Promise<void> => {
		if (state.animating) {
			grid({ gridTile: maybeTile.default, thisPatternRef })
		}
		else {
			state.tilesCompleted = 0
			grid({ gridTile: asyncMaybeTile.default, thisPatternRef })
			await new Promise<(resolveGrid: NullarySideEffector) => void>(gridComplete)
		}
	}

export default executeGrid
