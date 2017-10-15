import maybeAddEffectToggles from '../../../../src/ui/maybeAddEffectToggles'
import state from '../../../../src/state'
import * as effects from '../../../../effects/index'
import PageElement from '../../../../src/page/types/PageElement'

xdescribe('effect toggles', () => {
	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		maybeAddEffectToggles(Object.values(effects))
		state.mainHoundstooth.basePattern = {
			tileSettings: {
				tileSizeSetting: 50 as any,
			},
		}
		const effectToggle = document.querySelector('input.houndsmorphosis') as PageElement
		effectToggle.click()
		expect(state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(0 as any)
		effectToggle.click()
		expect(state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(50 as any)
	})
})
