import { appState } from '../../appState'

import grid from './grid'

const executeGrid: (_: { patternId: number }) => Promise<void> =
	async ({ patternId }: { patternId: number }): Promise<void> => {
		grid({ patternId })
		// @ts-ignore
		await new Promise<(_: () => void) => void>(storeResolveGrid)
	}

const storeResolveGrid: (resolveGrid: () => void) => void =
	(resolveGrid: () => void): void => {
		appState.execute.resolveGrid = resolveGrid
	}

export const wrapper = { executeGrid }
