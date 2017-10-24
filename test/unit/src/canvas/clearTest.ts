import { clear } from '../../../../src/canvas/clear'
import { state } from '../../../../src/state'
import { setSetting } from '../../../../src/store/setSetting'
import * as to from '../../../../src/utilities/to'

describe('clear', () => {
	let mixedDownClearRectSpy
	beforeEach(() => {
		setSetting('canvasSize', to.Px(450))

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
			expect(clearRectSpy).toHaveBeenCalledWith(0, 0, 450, 450)
		})

		it('also wipes the mixed down canvas', () => {
			expect(mixedDownClearRectSpy).toHaveBeenCalledWith(0, 0, 450, 450)
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

			expect(clearRectSpy1).toHaveBeenCalledWith(0, 0, 450, 450)
			expect(clearRectSpy2).toHaveBeenCalledWith(0, 0, 450, 450)
			expect(clearRectSpy3).toHaveBeenCalledWith(0, 0, 450, 450)
			expect(mixedDownClearRectSpy).toHaveBeenCalledWith(0, 0, 450, 450)
		})
	})
})
