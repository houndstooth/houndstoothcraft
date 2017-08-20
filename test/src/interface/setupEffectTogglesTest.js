import setupEffectToggles from '../../../src/interface/setupEffectToggles'
import store from '../../../store'

describe('setup effect toggles', () => {
	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		setupEffectToggles()
		store.mainHoundstooth.basePattern = {
			tileSettings: {
				tileSizeSetting: 50,
			},
		}
		document.querySelector('input.houndsmorphosis').click()
		expect(store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(0)
		document.querySelector('input.houndsmorphosis').click()
		expect(store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(50)
	})
})
