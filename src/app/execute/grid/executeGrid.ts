// tslint:disable:no-unsafe-any

import { grid } from '../../../pattern'
import { appState } from '../../appState'
import asyncMaybeTile from './asyncMaybeTile'
import gridComplete from './gridComplete'

const executeGrid: (_: { frameId: number }) => Promise<void> =
	async ({ frameId }: { frameId: number }): Promise<void> => {
		grid.default({ gridTile: asyncMaybeTile, frameId })
		await new Promise<(resolveGrid: () => void) => void>(gridComplete)
		appState.execute.tilesCompleted = 0
	}

export default executeGrid
