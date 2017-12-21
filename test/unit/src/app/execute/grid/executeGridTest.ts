import {
	appState,
	asyncMaybeTile,
	executeGrid,
	grid,
	gridComplete,
} from '../../../../../../src/indexForTest'

describe('execute grid', () => {
	let subject: (_: { patternId: number }) => Promise<void>
	const patternId: number = 99

	beforeEach(() => {
		subject = executeGrid.default
		const fakeGridComplete: (resolveGrid: () => void) => void =
			(resolveGrid: () => void): void => {
				appState.execute.resolveGrid = resolveGrid
			}
		spyOn(gridComplete, 'default').and.callFake(fakeGridComplete)

		spyOn(grid, 'default')
	})

	it('resets the count of tiles completed after the grid is complete', async (done: DoneFn) => {
		appState.execute.tilesCompleted = 256

		subject({ patternId }).then().catch()
		expect(appState.execute.tilesCompleted).toBe(256)

		appState.execute.resolveGrid()
		setTimeout(() => {
			expect(appState.execute.tilesCompleted).toBe(0)
			done()
		},         0)
	})

	it('calls the grid loop with the tile function and a reference to this pattern', () => {
		subject({ patternId }).then().catch()

		expect(grid.default).toHaveBeenCalledWith({ gridTile: asyncMaybeTile.default, patternId })
	})
})
