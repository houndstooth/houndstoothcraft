import Spy = jasmine.Spy
import * as page from '../../../../src/page'
import { createEffectToggle } from '../../../../src/page/createEffectToggle'
import * as createEffectTogglesContainer from '../../../../src/page/createEffectTogglesContainer'
import * as createLabel from '../../../../src/page/createLabel'
import { Effect } from '../../../../src/store/types'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create effect toggle', () => {
	const label: page.PageElement = buildMockElement()
	const houndstoothEffect: Effect = { name: 'mock tooth' }
	const effectTogglesContainerChildren: page.PageElement[] = []
	const effectTogglesContainer: page.PageElement = buildMockElement({ children: effectTogglesContainerChildren })
	let querySelectorSpy: Spy

	beforeAll(() => {
		querySelectorSpy = spyOn(window.document, 'querySelector').and.returnValue(effectTogglesContainer)
		spyOn(createLabel, 'createLabel').and.returnValue(label)

		createEffectToggle(houndstoothEffect)
	})

	it('adds a labelled checkbox for the effect to the toggles container', () => {
		expect(effectTogglesContainerChildren[ 0 ]).toBe(label)
	})

	it('creates the label with the houndstooth effect', () => {
		expect(createLabel.createLabel).toHaveBeenCalledWith({ houndstoothEffect })
	})

	it('creates the effect toggles container if it does not already exist', () => {
		querySelectorSpy.and.returnValue(undefined)
		const createEffectTogglesContainerSpy: Spy = spyOn(createEffectTogglesContainer, 'createEffectTogglesContainer')
		createEffectTogglesContainerSpy.and.returnValue(effectTogglesContainer)

		createEffectToggle(houndstoothEffect)

		expect(createEffectTogglesContainerSpy).toHaveBeenCalled()
	})
})
