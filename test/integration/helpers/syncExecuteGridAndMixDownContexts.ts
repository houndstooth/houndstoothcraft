// tslint:disable:no-unsafe-any

import { Context, grid, maybeTile, mixDownContexts, state } from '../../../src'

const syncExecuteGridAndMixDownContexts: (_: { thisPatternRef: number }) => void =
	({ thisPatternRef }: { thisPatternRef: number }): void => {
		state.canvas.contexts.forEach((context: Context): void => {
			if (context.canvas.style) {
				context.canvas.style.display = 'none'
			}
		})
		grid.default({ gridTile: maybeTile.default, thisPatternRef })
		mixDownContexts.default()
	}

export default syncExecuteGridAndMixDownContexts
