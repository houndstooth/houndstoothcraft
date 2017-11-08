import { setSetting } from '../../../../../src/app/store/setSetting'
import { state } from '../../../../../src/state'
import * as to from '../../../../../src/to'

describe('set setting', () => {
	it('sets the setting on the base pattern', () => {
		setSetting('canvasSize', to.Px(666))

		expect(state.mainHoundstooth.basePattern.viewSettings).toEqual(jasmine.objectContaining({
			canvasSize: to.Px(666),
		}))
	})
})
