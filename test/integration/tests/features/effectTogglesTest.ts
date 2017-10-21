import * as effects from '../../../../effects/index'
import { to } from '../../../../src'
import { PageElement } from '../../../../src/page/types/PageElement'
import { state } from '../../../../src/state'
import { maybeAddEffectToggles } from '../../../../src/ui/maybeAddEffectToggles'

xdescribe('effect toggles', () => {
	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		maybeAddEffectToggles(Object.values(effects))
		state.mainHoundstooth.basePattern = {
			tileSettings: {
				tileSizeSetting: to.Units(50),
			},
		}
		const effectToggle: PageElement = document.querySelector('input.houndsmorphosis') || {}
		effectToggle.click()
		const { tileSizeSetting } = state.mainHoundstooth.basePattern.tileSettings
		expect(tileSizeSetting).toBe(0)
		effectToggle.click()
		expect(tileSizeSetting).toBe(50)
	})
})
