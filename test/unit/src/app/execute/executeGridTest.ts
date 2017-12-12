import {
	appState,
	asyncMaybeTile,
	executeGrid,
	grid,
	gridComplete,
	NullarySideEffector,
} from '../../../../../src/indexForTest'

describe('execute grid', () => {
	let subject: (_: { thisPatternRef: number }) => Promise<void>
	const thisPatternRef: number = 99

	beforeEach(() => {
		subject = executeGrid.default
		const fakeGridComplete: (resolveGrid: NullarySideEffector) => void =
			(resolveGrid: NullarySideEffector): void => {
				appState.execute.resolveGrid = resolveGrid
			}
		spyOn(gridComplete, 'default').and.callFake(fakeGridComplete)

		spyOn(grid, 'default')
	})

	it('resets the count of tiles completed after the grid is complete', async (done: DoneFn) => {
		appState.execute.tilesCompleted = 256

		subject({ thisPatternRef }).then().catch()
		expect(appState.execute.tilesCompleted).toBe(256)

		appState.execute.resolveGrid()
		setTimeout(() => {
			expect(appState.execute.tilesCompleted).toBe(0)
			done()
		},         0)
	})

	it('calls the grid loop with the tile function and a reference to this pattern', () => {
		subject({ thisPatternRef }).then().catch()

		expect(grid.default).toHaveBeenCalledWith({ gridTile: asyncMaybeTile.default, thisPatternRef })
	})
})
