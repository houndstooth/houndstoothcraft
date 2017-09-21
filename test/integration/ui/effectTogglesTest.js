import addEffectToggles from '../../../src/ui/addEffectToggles'
import state from '../../../state'
import effects from '../../../effects'
import resetState from '../../../src/store/resetState'

xdescribe('effect toggles', () => {
	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		resetState(state)
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
