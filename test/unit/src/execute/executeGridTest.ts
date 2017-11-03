import * as components from '../../../../src/components'
import { asyncMaybeTile } from '../../../../src/components/asyncMaybeTile'
import { executeGrid } from '../../../../src/execute/executeGrid'
import * as gridComplete from '../../../../src/execute/gridComplete'
import { state } from '../../../../src/state'
import { setSetting } from '../../../../src/store/setSetting'

describe('execute grid', () => {
	const gridSize: number = 2
	beforeEach(() => {
		// This is false in every other test. Currently only used for testing.
		// So, we need to turn it off for this test to truly test the subject.
		state.syncMode = false

		spyOn(gridComplete, 'gridComplete')

		spyOn(components, 'grid')
		setSetting('gridSettings', { gridSize })
	})

	describe('when animating', () => {
		it('calls grid loop with the synchronous tile function', async (done: DoneFn) => {
			state.animating = true

			executeGrid().then().catch()

			expect(components.grid).toHaveBeenCalledWith({ gridTile: components.maybeTile })
			expect(components.grid).not.toHaveBeenCalledWith({ gridTile: asyncMaybeTile })

			done()
		})
	})

	describe('when not animating', () => {
		beforeEach(() => {
			state.animating = false
		})

		it('resets the count of tiles completed', async (done: DoneFn) => {
			state.tilesCompleted = 256

			executeGrid().then().catch()

			expect(state.tilesCompleted).toBe(0)

			done()
		})

		it('calls grid loop with the synchronous tile function', async (done: DoneFn) => {
			executeGrid().then().catch()

			expect(components.grid).toHaveBeenCalledWith({ gridTile: asyncMaybeTile })
			expect(components.grid).not.toHaveBeenCalledWith({ gridTile: components.maybeTile })

			done()
		})

		it('waits for the grid tobe complete', async (done: DoneFn) => {
			executeGrid().then().catch()

			expect(gridComplete.gridComplete).toHaveBeenCalled()

			done()
		})
	})
})
