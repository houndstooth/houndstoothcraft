import { setSetting } from '../../../../../src/app/store/setSetting'
import { executeGrid } from '../../../../../src/pattern/grid/executeGrid'
import * as grid from '../../../../../src/pattern/grid/grid'
import * as gridComplete from '../../../../../src/pattern/grid/gridComplete'
import { asyncMaybeTile } from '../../../../../src/pattern/tile/asyncMaybeTile'
import { maybeTile } from '../../../../../src/pattern/tile/maybeTile'
import { state } from '../../../../../src/state'

describe('execute grid', () => {
	const tileResolution: number = 2
	const thisPatternRef: number = 99

	beforeEach(() => {
		// This is false in every other test. Currently only used for testing.
		// So, we need to turn it off for this test to truly test the subject.
		state.syncMode = false

		spyOn(gridComplete, 'gridComplete')

		spyOn(grid, 'grid')
		setSetting('gridSettings', { tileResolution })
	})

	describe('when animating', () => {
		it('calls grid loop with the synchronous tile function', async (done: DoneFn) => {
			state.animating = true

			executeGrid({ thisPatternRef }).then().catch()

			expect(grid.grid).toHaveBeenCalledWith({ gridTile: maybeTile, thisPatternRef })
			expect(grid.grid).not.toHaveBeenCalledWith({ gridTile: asyncMaybeTile, thisPatternRef })

			done()
		})
	})

	describe('when not animating', () => {
		beforeEach(() => {
			state.animating = false
		})

		it('resets the count of tiles completed', async (done: DoneFn) => {
			state.tilesCompleted = 256

			executeGrid({ thisPatternRef }).then().catch()

			expect(state.tilesCompleted).toBe(0)

			done()
		})

		it('calls grid loop with the synchronous tile function', async (done: DoneFn) => {
			executeGrid({ thisPatternRef }).then().catch()

			expect(grid.grid).toHaveBeenCalledWith({ gridTile: asyncMaybeTile, thisPatternRef })
			expect(grid.grid).not.toHaveBeenCalledWith({ gridTile: maybeTile, thisPatternRef })

			done()
		})

		it('waits for the grid tobe complete', async (done: DoneFn) => {
			executeGrid({ thisPatternRef }).then().catch()

			expect(gridComplete.gridComplete).toHaveBeenCalled()

			done()
		})
	})
})
