import setupEffectToggles from '../../../src/ui/setupEffectToggles'
import state from '../../../state'
import effects from '../../../effects'

describe('setup effect toggles', () => {
	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		setupEffectToggles(Object.values(effects))
		state.mainHoundstooth.basePattern = {
			tileSettings: {
				tileSizeSetting: 50,
			},
		}
		document.querySelector('input.houndsmorphosis').click()
		expect(state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(0)
		document.querySelector('input.houndsmorphosis').click()
		expect(state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(50)
	})
})
