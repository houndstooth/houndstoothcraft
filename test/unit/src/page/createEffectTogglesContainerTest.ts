import { PageElement } from '../../../../src/page'
import Spy = jasmine.Spy
import * as createCanvasContainer from '../../../../src/page/createCanvasContainer'
import { createEffectTogglesContainer } from '../../../../src/page/createEffectTogglesContainer'
import * as insertElementRightAfter from '../../../../src/page/insertElementRightAfter'
import * as windowWrapper from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create effect toggles container', () => {
	let returnedEffectTogglesContainer: PageElement
	let effectTogglesContainer: PageElement
	let canvasContainer: PageElement
	let insertElementRightAfterSpy: Spy
	let querySelectorSpy: Spy
	const effectTogglesContainerClassList: string[] = []
	beforeEach(() => {
		effectTogglesContainer = buildMockElement({ classList: effectTogglesContainerClassList })
		spyOn(windowWrapper.document, 'createElement').and.returnValue(effectTogglesContainer)

		canvasContainer = buildMockElement()
		querySelectorSpy = spyOn(windowWrapper.document, 'querySelector').and.returnValue(canvasContainer)

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

	it('creates the canvas container if it does not already exist', () => {
		querySelectorSpy.and.returnValue(undefined)
		spyOn(createCanvasContainer, 'createCanvasContainer').and.returnValue(canvasContainer)

		createEffectTogglesContainer()

		expect(createCanvasContainer.createCanvasContainer).toHaveBeenCalled()
	})
})
