import * as effects from '../../../../effects'
// tslint:disable-next-line:no-reaching-imports
import { GONGRAM_COLOR_SET } from '../../../../effects/gongram/constants'
import { colorSettings, createEffectToggles, getFromBaseOrDefaultPattern, PageElement } from '../../../../src'
import { buildMockElement } from '../../../unit'

describe('effect toggles', () => {
	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', () => {
		const effectTogglesContainer: HTMLElement = document.createElement('div')
		effectTogglesContainer.setAttribute('id', 'effect-toggles-container')
		effectTogglesContainer.style.display = 'none'
		document.body.appendChild(effectTogglesContainer)

		const warningsContainer: HTMLElement = document.createElement('div')
		warningsContainer.setAttribute('id', 'warnings-container')
		warningsContainer.style.display = 'none'
		document.body.appendChild(warningsContainer)

		createEffectToggles.main(Object.values(effects))
		const effectToggle: PageElement = document.querySelector('input.gongram') as HTMLElement || buildMockElement()

		expect(getFromBaseOrDefaultPattern.main('colorSet')).toEqual(colorSettings.DEFAULT_COLOR_SET)

		// tslint:disable-next-line:no-unsafe-any
		effectToggle.click()
		expect(getFromBaseOrDefaultPattern.main('colorSet')).toEqual(GONGRAM_COLOR_SET)

		// tslint:disable-next-line:no-unsafe-any
		effectToggle.click()
		expect(getFromBaseOrDefaultPattern.main('colorSet')).toEqual(colorSettings.DEFAULT_COLOR_SET)
	})
})
