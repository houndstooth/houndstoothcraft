// tslint:disable:no-unsafe-any

import { grid } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import asyncMaybeTile from './asyncMaybeTile'
import gridComplete from './gridComplete'

const executeGrid: (_: { thisPatternRef: number }) => Promise<void> =
	async ({ thisPatternRef }: { thisPatternRef: number }): Promise<void> => {
		grid.default({ gridTile: asyncMaybeTile, thisPatternRef })
		await new Promise<(resolveGrid: NullarySideEffector) => void>(gridComplete)
		appState.execute.tilesCompleted = 0
	}

export default executeGrid
