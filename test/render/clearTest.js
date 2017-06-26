import 'jasmine'

import clear from '../../src/render/clear'
import ctx from '../../src/render/ctx'

import _resetStatesForTest from '../_resetStatesForTest'
beforeEach(() => _resetStatesForTest({ 
    state: typeof state === 'undefined' ? {} : state, 
    iterations: typeof iterations === 'undefined' ? {} : iterations, 
    animations: typeof animations === 'undefined' ? {} : animations, 
}))

describe('clear', () => {
	it('wipes the entire canvas', () => {
		spyOn(ctx, 'clearRect')
		state.viewConfig = { canvasSize: 500 }

		clear()

		expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 500, 500)
	})
})
