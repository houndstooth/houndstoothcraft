import { asyncMaybeTile, executeGrid, grid, gridComplete, maybeTile, setSetting, state } from '../../../../../src'

describe('execute grid', () => {
	const tileResolution: number = 2
	const thisPatternRef: number = 99

	beforeEach(() => {
		// This is false in every other test. Currently only used for testing.
		// So, we need to turn it off for this test to truly test the subject.
		state.syncMode = false

		spyOn(gridComplete, 'main')

		spyOn(grid, 'main')
		setSetting.main('gridSettings', { tileResolution })
	})

	describe('when animating', () => {
		it('calls grid loop with the synchronous tile function', async (done: DoneFn) => {
			state.animating = true

			executeGrid.main({ thisPatternRef }).then().catch()

			expect(grid.main).toHaveBeenCalledWith({ gridTile: maybeTile.main, thisPatternRef })
			expect(grid.main).not.toHaveBeenCalledWith({ gridTile: asyncMaybeTile.main, thisPatternRef })

			done()
		})
	})

	describe('when not animating', () => {
		beforeEach(() => {
			state.animating = false
		})

		it('resets the count of tiles completed', async (done: DoneFn) => {
			state.tilesCompleted = 256

			executeGrid.main({ thisPatternRef }).then().catch()

			expect(state.tilesCompleted).toBe(0)

			done()
		})

		it('calls grid loop with the synchronous tile function', async (done: DoneFn) => {
			executeGrid.main({ thisPatternRef }).then().catch()

			expect(grid.main).toHaveBeenCalledWith({ gridTile: asyncMaybeTile.main, thisPatternRef })
			expect(grid.main).not.toHaveBeenCalledWith({ gridTile: maybeTile.main, thisPatternRef })

			done()
		})

		it('waits for the grid tobe complete', async (done: DoneFn) => {
			executeGrid.main({ thisPatternRef }).then().catch()

			expect(gridComplete.main).toHaveBeenCalled()

			done()
		})
	})
})
