import { state } from '../../../../src/state'
import { setSetting } from '../../../../src/store/setSetting'
import * as to from '../../../../src/utilities/to'

describe('set setting', () => {
	it('sets the setting on the base pattern', () => {
		setSetting('canvasSize', to.Px(666))

		const expectation = jasmine.objectContaining({ canvasSize: to.Px(666) })
		expect(state.mainHoundstooth.basePattern.viewSettings).toEqual(expectation)
	})
})
