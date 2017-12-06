import { setSetting, state, to } from '../../../../../src'

describe('set setting', () => {
	it('sets the setting on the current pattern', () => {
		setSetting.default('rotateViewAboutCanvasCenter', to.Radian(666))

		expect(state.settings.currentPattern.viewSettings).toEqual(jasmine.objectContaining({
			rotateViewAboutCanvasCenter: to.Radian(666),
		}))
	})
})
