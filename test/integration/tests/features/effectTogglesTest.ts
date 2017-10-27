import * as effects from '../../../../effects/index'
import { to } from '../../../../src'
import { Unit } from '../../../../src/components/types/Unit'
import { PageElement } from '../../../../src/page/types/PageElement'
import { state } from '../../../../src/state'
import { getFromBaseOrDefaultPattern } from '../../../../src/store/getFromBaseOrDefaultPattern'
import { maybeAddEffectToggles } from '../../../../src/ui/maybeAddEffectToggles'
import { buildMockElement } from '../../../unit/helpers/buildMockElement'

xdescribe('effect toggles', () => {
	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		maybeAddEffectToggles(Object.values(effects))
		state.mainHoundstooth.basePattern = {
			tileSettings: {
				tileSize: to.Unit(50),
			},
		}
		const effectToggle: PageElement = document.querySelector('input.houndsmorphosis') || buildMockElement()
		// tslint:disable-next-line:no-unsafe-any
		effectToggle.click()

		const tileSize: Unit = getFromBaseOrDefaultPattern('tileSize')

		expect(tileSize).toBe(to.Unit(0))
		// tslint:disable-next-line:no-unsafe-any
		effectToggle.click()
		expect(tileSize).toBe(to.Unit(50))
	})
})
