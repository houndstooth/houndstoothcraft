import * as effects from '../../../../effects'
// tslint:disable-next-line:no-reaching-imports
import { GONGRAM_COLOR_SET } from '../../../../effects/gongram/constants'
import {
	colorSettings,
	createEffectToggles,
	enableOrDisableOtherEffectToggles,
	executeLayer,
	getSetting,
	PageElement,
	updateCurrentFrame,
} from '../../../../src'
import { buildMockElement } from '../../../unit'

describe('effect toggles', () => {
	beforeEach(() => {
		spyOn(executeLayer, 'default')
		spyOn(updateCurrentFrame, 'default')
		spyOn(enableOrDisableOtherEffectToggles, 'default')

		const descriptionsContainer: HTMLElement = document.createElement('div')
		descriptionsContainer.setAttribute('id', 'descriptions-container')
		descriptionsContainer.style.display = 'none'
		document.body.appendChild(descriptionsContainer)
	})

	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		const effectTogglesContainer: HTMLElement = document.createElement('div')
		effectTogglesContainer.setAttribute('id', 'effect-toggles-container')
		effectTogglesContainer.style.display = 'none'
		document.body.appendChild(effectTogglesContainer)

		createEffectToggles.default(Object.values(effects))
		const effectToggle: PageElement = document.querySelector('input#gongram') as HTMLElement || buildMockElement()

		expect(getSetting.default('colorSet')).toEqual(colorSettings.DEFAULT_COLOR_SET)

		// tslint:disable-next-line:no-unsafe-any
		effectToggle.click()
		expect(getSetting.default('colorSet')).toEqual(GONGRAM_COLOR_SET)

		// tslint:disable-next-line:no-unsafe-any
		effectToggle.click()
		expect(getSetting.default('colorSet')).toEqual(colorSettings.DEFAULT_COLOR_SET)
	})
})
