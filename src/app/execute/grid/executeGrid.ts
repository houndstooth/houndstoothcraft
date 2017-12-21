// tslint:disable:no-unsafe-any

import { grid } from '../../../pattern'
import { appState } from '../../appState'
import asyncMaybeTile from './asyncMaybeTile'
import gridComplete from './gridComplete'

const executeGrid: (_: { patternId: number }) => Promise<void> =
	async ({ patternId }: { patternId: number }): Promise<void> => {
		grid.default({ gridTile: asyncMaybeTile, patternId })
		await new Promise<(resolveGrid: () => void) => void>(gridComplete)
		appState.execute.tilesCompleted = 0
	}

export default executeGrid
