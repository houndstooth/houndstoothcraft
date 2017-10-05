import addEffectToggles from '../../../../src/ui/addEffectToggles'
import state from '../../../../src/state'
import * as effects from '../../../../effects/index'

xdescribe('effect toggles', () => {
	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		addEffectToggles(Object.values(effects))
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
