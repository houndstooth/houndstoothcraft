import { GONGRAM_COLOR_SET } from '../../../../effects/gongram/constants'
import * as effects from '../../../../effects/index'
import { PageElement } from '../../../../src/page'
import { DEFAULT_COLOR_SET } from '../../../../src/store/defaults'
import { getFromBaseOrDefaultPattern } from '../../../../src/store/getFromBaseOrDefaultPattern'
import { maybeAddEffectToggles } from '../../../../src/ui/maybeAddEffectToggles'
import { buildMockElement } from '../../../unit/helpers/buildMockElement'

describe('effect toggles', () => {
	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		maybeAddEffectToggles(Object.values(effects))
		const effectToggle: PageElement = document.querySelector('input.gongram') as HTMLElement || buildMockElement()

		expect(getFromBaseOrDefaultPattern('colorSet')).toEqual(DEFAULT_COLOR_SET)

		// tslint:disable-next-line:no-unsafe-any
		effectToggle.click()
		expect(getFromBaseOrDefaultPattern('colorSet')).toEqual(GONGRAM_COLOR_SET)

		// tslint:disable-next-line:no-unsafe-any
		effectToggle.click()
		expect(getFromBaseOrDefaultPattern('colorSet')).toEqual(DEFAULT_COLOR_SET)
	})
})
