import * as effects from '../../../../effects'
// tslint:disable-next-line:no-reaching-imports
import { GONGRAM_COLOR_SET } from '../../../../effects/gongram/constants'
import {
	appState,
	constants,
	createEffectToggles,
	enableOrDisableOtherEffectToggles,
	executeGridAndMaybeLogging,
	patternState,
	to,
	updateCurrentFrame,
} from '../../../../src/indexForTest'
import { buildMockElement } from '../../../unit'

describe('controls', () => {
	const { BLACK, TRANSPARENT } = constants

	describe('effect toggles', () => {
		beforeEach(() => {
			spyOn(executeGridAndMaybeLogging, 'default')
			spyOn(updateCurrentFrame, 'default')
			spyOn(enableOrDisableOtherEffectToggles, 'default')

			const descriptionsContainer: HTMLElement = document.createElement('div')
			descriptionsContainer.setAttribute('id', 'descriptions-container')
			descriptionsContainer.style.display = 'none'
			document.body.appendChild(descriptionsContainer)
			appState.dom.descriptionsContainer = descriptionsContainer
		})

		it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
			const effectTogglesContainer: HTMLElement = document.createElement('div')
			effectTogglesContainer.setAttribute('id', 'effect-toggles-container')
			effectTogglesContainer.style.display = 'none'
			document.body.appendChild(effectTogglesContainer)

			createEffectToggles.default(Object.values(effects))
			const effectToggle: HTMLElement = document.querySelector('input#gongram') as HTMLElement || buildMockElement()

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
