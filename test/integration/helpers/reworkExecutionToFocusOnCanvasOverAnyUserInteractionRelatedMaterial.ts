import {
	appState,
	completeLayers,
	executeGrid,
	executeTile,
	grid,
	mixDownContexts,
	tile,
	updateOverrideNodes,
	updateOverrides,
} from '../../../src/indexForTest'

const reworkExecutionToFocusOnCanvasOverAnyUserInteractionRelatedMaterial: () => void =
	(): void => {
		spyOn(executeGrid, 'default').and.callFake(fakeGrid)
		spyOn(executeTile, 'default').and.callFake(tile.default)
		spyOn(completeLayers, 'default')
		spyOn(updateOverrides, 'default')
		spyOn(updateOverrideNodes, 'default')
	}

const fakeGrid: () => void =
	(): void => {
		appState.render.contexts.forEach((context: CanvasRenderingContext2D): void => {
			if (context.canvas.style) {
				context.canvas.style.display = 'none'
			}
		})
		grid.default({ patternId: 0 })
		mixDownContexts.default()
	}

export default reworkExecutionToFocusOnCanvasOverAnyUserInteractionRelatedMaterial
