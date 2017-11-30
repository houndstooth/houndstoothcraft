// tslint:disable:no-unsafe-any

import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { asyncMaybeTile } from '../tile'
import grid from './grid'
import gridComplete from './gridComplete'

const executeGrid: (_: { thisPatternRef: number }) => Promise<void> =
	async ({ thisPatternRef }: { thisPatternRef: number }): Promise<void> => {
		grid({ gridTile: asyncMaybeTile.default, thisPatternRef })
		await new Promise<(resolveGrid: NullarySideEffector) => void>(gridComplete)
		state.tilesCompleted = 0
	}

export default executeGrid
