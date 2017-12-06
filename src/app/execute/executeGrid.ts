// tslint:disable:no-unsafe-any

import { grid } from '../../pattern'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import asyncMaybeTile from './asyncMaybeTile'
import gridComplete from './gridComplete'

const executeGrid: (_: { thisPatternRef: number }) => Promise<void> =
	async ({ thisPatternRef }: { thisPatternRef: number }): Promise<void> => {
		grid.default({ gridTile: asyncMaybeTile, thisPatternRef })
		await new Promise<(resolveGrid: NullarySideEffector) => void>(gridComplete)
		state.execute.tilesCompleted = 0
	}

export default executeGrid
