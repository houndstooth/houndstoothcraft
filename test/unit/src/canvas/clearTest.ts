import clear from '../../../../src/canvas/clear'
import * as getCanvasDimensions from '../../../../src/canvas/getCanvasDimensions'
import state from '../../../../src/state'

describe('clear', () => {
	let mixedDownClearRectSpy
	beforeEach(() => {
		spyOn(getCanvasDimensions, 'default').and.returnValue([ 400, 500 ])

		mixedDownClearRectSpy = jasmine.createSpy('mixedDownClearRect')
		state.mixedDownContext = { clearRect: mixedDownClearRectSpy }
	})

	describe('when there is a single context', () => {
		let clearRectSpy
		beforeEach(() => {
			clearRectSpy = jasmine.createSpy('clearRect')
			state.contexts = [ { clearRect: clearRectSpy } ]

			clear()
		})

		it('wipes the default amount of canvas', () => {
			expect(clearRectSpy).toHaveBeenCalledWith(0, 0, 400, 500)
		})

		it('also wipes the mixed down canvas', () => {
			expect(mixedDownClearRectSpy).toHaveBeenCalledWith(0, 0, 400, 500)
		})
	})

	describe('when there are multiple contexts', () => {
		it('wipes every canvas', () => {
			const clearRectSpy1 = jasmine.createSpy('clearRect1')
			const clearRectSpy2 = jasmine.createSpy('clearRect2')
			const clearRectSpy3 = jasmine.createSpy('clearRect3')
			state.contexts = [
				{ clearRect: clearRectSpy1 },
				{ clearRect: clearRectSpy2 },
				{ clearRect: clearRectSpy3 },
			]

			clear()

			expect(clearRectSpy1).toHaveBeenCalledWith(0, 0, 400, 500)
			expect(clearRectSpy2).toHaveBeenCalledWith(0, 0, 400, 500)
			expect(clearRectSpy3).toHaveBeenCalledWith(0, 0, 400, 500)
			expect(mixedDownClearRectSpy).toHaveBeenCalledWith(0, 0, 400, 500)
		})
	})
})
