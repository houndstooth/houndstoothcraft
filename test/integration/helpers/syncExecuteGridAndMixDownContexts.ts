// tslint:disable:no-unsafe-any

import { appState, Context, grid, maybeTile, mixDownContexts } from '../../../src'

const syncExecuteGridAndMixDownContexts: (_: { thisPatternRef: number }) => void =
	({ thisPatternRef }: { thisPatternRef: number }): void => {
		appState.canvas.contexts.forEach((context: Context): void => {
			if (context.canvas.style) {
				context.canvas.style.display = 'none'
			}
		})
		grid.default({ gridTile: maybeTile.default, thisPatternRef })
		mixDownContexts.default()
	}

export default syncExecuteGridAndMixDownContexts
