import setupEffectToggles from '../../../src/application/setupEffectToggles'
import store from '../../../store'
import composeMainHoundstooth from '../../../src/store/composeMainHoundstooth'

describe('setup effect toggles', () => {
	beforeEach(composeMainHoundstooth)

	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		setupEffectToggles()

		expect(store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(50)
		document.querySelector('input.houndsmorphosis').click()
		expect(store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(0)
		document.querySelector('input.houndsmorphosis').click()
		expect(store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(50)
	})
})
