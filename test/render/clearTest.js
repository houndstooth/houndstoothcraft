import 'jasmine'

import clear from '../../render/clear'
import ctx from '../../render/ctx'
import state from '../../state/state'

describe('clear', () => {
	it('wipes the entire canvas', () => {
		spyOn(ctx, 'clearRect')
		state.viewConfig.canvasSize = 500

		clear()

		expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 500, 500)
	})
})
