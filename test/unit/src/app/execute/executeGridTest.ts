import {
	appState,
	asyncMaybeTile,
	executeGrid,
	grid,
	gridComplete,
	NullarySideEffector,
	setSetting,
} from '../../../../../src'

describe('execute grid', () => {
	const tileResolution: number = 2
	const thisPatternRef: number = 99

	beforeEach(() => {
		const fakeGridComplete: (resolveGrid: NullarySideEffector) => void =
			(resolveGrid: NullarySideEffector): void => {
				appState.execute.resolveGrid = resolveGrid
			}
		spyOn(gridComplete, 'default').and.callFake(fakeGridComplete)

		spyOn(grid, 'default')
		setSetting.default('gridSettings', { tileResolution })
	})

	it('resets the count of tiles completed after the grid is complete', async (done: DoneFn) => {
		appState.execute.tilesCompleted = 256

		executeGrid.default({ thisPatternRef }).then().catch()
		expect(appState.execute.tilesCompleted).toBe(256)

		appState.execute.resolveGrid()
		setTimeout(() => {
			expect(appState.execute.tilesCompleted).toBe(0)
			done()
		},         0)
	})

	it('calls the grid loop with the tile function and a reference to this pattern', () => {
		executeGrid.default({ thisPatternRef }).then().catch()

		expect(grid.default).toHaveBeenCalledWith({ gridTile: asyncMaybeTile.default, thisPatternRef })
	})
})
