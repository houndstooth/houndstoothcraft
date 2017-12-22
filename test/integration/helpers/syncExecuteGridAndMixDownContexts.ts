// tslint:disable:no-unsafe-any

import { appState, grid, mixDownContexts, tile } from '../../../src/indexForTest'

const syncExecuteGridAndMixDownContexts: (_: { patternId: number }) => void =
	({ patternId }: { patternId: number }): void => {
		appState.render.contexts.forEach((context: CanvasRenderingContext2D): void => {
			if (context.canvas.style) {
				context.canvas.style.display = 'none'
			}
		})
		grid.default({ gridTile: tile.default, patternId })
		mixDownContexts.default()
	}

export default syncExecuteGridAndMixDownContexts
