import * as effects from '../../../../effects'
import { GONGRAM_COLOR_SET } from '../../../../effects/gongram/constants'
import { gongramEffect } from '../../../../effects/gongram/effects/gongramEffect'
import {
	appState,
	BLACK,
	createEffectToggles,
	enableOrDisableOtherEffectToggles,
	patternState,
	to,
	TRANSPARENT,
	updateCurrentFrame,
} from '../../../../src/indexForTest'
import { createMockElement } from '../../../unit'

describe('controls', () => {
	describe('effect toggles', () => {
		beforeEach(() => {
			spyOn(updateCurrentFrame, 'default')
			spyOn(enableOrDisableOtherEffectToggles, 'default')

			const descriptionsContainer: HTMLElement = document.createElement('div')
			descriptionsContainer.setAttribute('id', 'descriptions-container')
			descriptionsContainer.style.display = 'none'
			document.body.appendChild(descriptionsContainer)
			appState.dom.descriptionsContainer = descriptionsContainer
		})

		it('attaches handlers which cause the setting of the main houndstooth to change based on the effect', () => {
			const effectTogglesContainer: HTMLElement = document.createElement('div')
			effectTogglesContainer.setAttribute('id', 'effect-toggles-container')
			effectTogglesContainer.style.display = 'none'
			document.body.appendChild(effectTogglesContainer)
			appState.dom.effectTogglesContainer = effectTogglesContainer

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
