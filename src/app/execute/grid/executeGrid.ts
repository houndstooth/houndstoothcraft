import { grid } from '../../../pattern'
import { appState } from '../../appState'
import { executeTile } from '../tile'

const executeGrid: (_: { patternId: number }) => Promise<void> =
	async ({ patternId }: { patternId: number }): Promise<void> => {
		grid.default({ gridTile: executeTile.default, patternId })

		await new Promise<(_: () => void) => void>(storeResolveGrid)
	}

const storeResolveGrid: (resolveGrid: () => void) => void =
	(resolveGrid: () => void): void => {
		appState.execute.resolveGrid = resolveGrid
	}

export default executeGrid
