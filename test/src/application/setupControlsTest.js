import setupControls from '../../../src/application/setupControls'
import store from '../../../store'
import composeMainHoundstooth from '../../../src/store/composeMainHoundstooth'

describe('setup controls', () => {
	beforeEach(composeMainHoundstooth)

	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		setupControls()

		expect(store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(50)
		document.querySelector('input.houndsmorphosis').click()
		expect(store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(0)
		document.querySelector('input.houndsmorphosis').click()
		expect(store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(50)
	})
})
