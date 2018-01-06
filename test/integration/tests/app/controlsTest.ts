import * as effects from '../../../../effects'
import { GONGRAM_COLOR_SET } from '../../../../effects/gongram/constants'
import { gongramEffect } from '../../../../effects/gongram/effects/gongramEffect'
import {
	appState,
	BLACK,
	createEffectToggles,
	patternState,
	to,
	TRANSPARENT,
} from '../../../../src/indexForTest'
import { createMockElement } from '../../../unit'

describe('controls', () => {
	describe('effect toggles', () => {
		it('attaches handlers which cause the setting of the main houndstooth to change based on the effect', () => {
			appState.settings.availableEffects = { gongram: gongramEffect }

			createEffectToggles.default(Object.values(effects))
			const effectToggle: HTMLElement = document.querySelector('input#gongram') as HTMLElement || createMockElement()

			expect(patternState.colorSettings.colorSet).toEqual(to.ColorSet([ BLACK, TRANSPARENT ]))

			// tslint:disable-next-line:no-unsafe-any
			effectToggle.click()
			expect(patternState.colorSettings.colorSet).toEqual(GONGRAM_COLOR_SET)

			// tslint:disable-next-line:no-unsafe-any
			effectToggle.click()
			expect(patternState.colorSettings.colorSet).toEqual(to.ColorSet([ BLACK, TRANSPARENT ]))
		})
	})
})
