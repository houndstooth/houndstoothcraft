import 'jasmine'

import clear from '../../src/render/clear'
import ctx from '../../src/render/ctx'
import state from '../../src/state/state'

describe('clear', () => {
	it('wipes the entire canvas', () => {
		spyOn(ctx, 'clearRect')
		state.viewConfig = { canvasSize: 500 }

		clear()

		expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 500, 500)
	})
})
