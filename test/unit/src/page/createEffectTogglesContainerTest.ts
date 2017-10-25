import { createEffectTogglesContainer } from '../../../../src/page/createEffectTogglesContainer'
import * as insertElementRightAfter from '../../../../src/page/insertElementRightAfter'
import { PageElement } from '../../../../src/page/types/PageElement'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'
import Spy = jasmine.Spy

describe('create effect toggles container', () => {
	let returnedEffectTogglesContainer: PageElement
	let mockEffectTogglesContainer: PageElement
	let mockCanvasContainer: PageElement
	let insertElementRightAfterSpy: Spy
	const mockEffectTogglesContainerClassList: string[] = []
	beforeEach(() => {
		mockEffectTogglesContainer = buildMockElement({ mockClassList: mockEffectTogglesContainerClassList })
		spyOn(window.document, 'createElement').and.returnValue(mockEffectTogglesContainer)

		mockCanvasContainer = buildMockElement()
		spyOn(window.document, 'querySelector').and.returnValue(mockCanvasContainer)

		insertElementRightAfterSpy = spyOn(insertElementRightAfter, 'insertElementRightAfter')

		returnedEffectTogglesContainer = createEffectTogglesContainer()
	})

	it('returns the newly created effect toggles container', () => {
		expect(returnedEffectTogglesContainer).toBe(mockEffectTogglesContainer)
	})

	it('assigns a class to the effect toggles container', () => {
		const classAddedToEffectTogglesContainer = mockEffectTogglesContainerClassList[0]
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
		expect(insertElementRightAfterSpy).toHaveBeenCalledWith(returnedEffectTogglesContainer, mockCanvasContainer)
	})
})
