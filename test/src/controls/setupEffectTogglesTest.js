import setupEffectToggles from '../../../src/controls/setupEffectToggles'
import store from '../../../store'
import effects from '../../../effects'

describe('setup effect toggles', () => {
	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		setupEffectToggles(Object.values(effects))
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
