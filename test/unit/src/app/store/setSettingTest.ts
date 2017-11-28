import { setSetting, state, to } from '../../../../../src'

describe('set setting', () => {
	it('sets the setting on the current pattern', () => {
		setSetting.default('canvasSize', to.Px(666))

		expect(state.currentPattern.viewSettings).toEqual(jasmine.objectContaining({
			canvasSize: to.Px(666),
		}))
	})
})
