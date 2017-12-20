import {
	appState,
	asyncMaybeTile,
	executeGrid,
	grid,
	gridComplete,
} from '../../../../../src/indexForTest'

describe('execute grid', () => {
	let subject: (_: { frameId: number }) => Promise<void>
	const frameId: number = 99

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

		subject({ frameId }).then().catch()
		expect(appState.execute.tilesCompleted).toBe(256)

		appState.execute.resolveGrid()
		setTimeout(() => {
			expect(appState.execute.tilesCompleted).toBe(0)
			done()
		},         0)
	})

	it('calls the grid loop with the tile function and a reference to this pattern', () => {
		subject({ frameId }).then().catch()

		expect(grid.default).toHaveBeenCalledWith({ gridTile: asyncMaybeTile.default, frameId })
	})
})
