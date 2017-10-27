import { createEffectTogglesContainer } from '../../../../src/page/createEffectTogglesContainer'
import * as insertElementRightAfter from '../../../../src/page/insertElementRightAfter'
import { PageElement } from '../../../../src/page/types/PageElement'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'
import Spy = jasmine.Spy

describe('create effect toggles container', () => {
	let returnedEffectTogglesContainer: PageElement
	let effectTogglesContainer: PageElement
	let canvasContainer: PageElement
	let insertElementRightAfterSpy: Spy
	const effectTogglesContainerClassList: string[] = []
	beforeEach(() => {
		effectTogglesContainer = buildMockElement({ classList: effectTogglesContainerClassList })
		spyOn(window.document, 'createElement').and.returnValue(effectTogglesContainer)

		canvasContainer = buildMockElement()
		spyOn(window.document, 'querySelector').and.returnValue(canvasContainer)

		insertElementRightAfterSpy = spyOn(insertElementRightAfter, 'insertElementRightAfter')

		returnedEffectTogglesContainer = createEffectTogglesContainer()
	})

	it('returns the newly created effect toggles container', () => {
		expect(returnedEffectTogglesContainer).toBe(effectTogglesContainer)
	})

	it('assigns a class to the effect toggles container', () => {
		const classAddedToEffectTogglesContainer: string = effectTogglesContainerClassList[0]
		expect(classAddedToEffectTogglesContainer).toBe('effect-toggles-container')
	})

	it('adds padding to the effect toggles container', () => {
		if (!returnedEffectTogglesContainer.style) {
			fail()
		}
		else {
			expect(returnedEffectTogglesContainer.style.padding).toBe('20px')
		}
	})

	it('inserts the effect toggles container after the canvas', () => {
		expect(insertElementRightAfterSpy).toHaveBeenCalledWith(returnedEffectTogglesContainer, canvasContainer)
	})
})
