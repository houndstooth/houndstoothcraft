import { setSetting, state, to } from '../../../../../src'

describe('set setting', () => {
	it('sets the setting on the base pattern', () => {
		setSetting.main('canvasSize', to.Px(666))

		expect(state.mainHoundstooth.basePattern.viewSettings).toEqual(jasmine.objectContaining({
			canvasSize: to.Px(666),
		}))
	})
})
