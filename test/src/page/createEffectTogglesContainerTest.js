import * as insertElementRightAfter from '../../../src/page/insertElementRightAfter'
import createEffectTogglesContainer from '../../../src/page/createEffectTogglesContainer'
import * as window from '../../../src/utilities/windowWrapper'
import buildMockElement from '../helpers/buildMockElement'

describe('create effect toggles container', () => {
	let returnedEffectTogglesContainer, mockEffectTogglesContainer, mockCanvasContainer
	const mockEffectTogglesContainerClassList = []
	beforeEach(() => {
		mockEffectTogglesContainer = buildMockElement({ mockClassList: mockEffectTogglesContainerClassList })
		spyOn(window.document, 'createElement').and.returnValue(mockEffectTogglesContainer)

		mockCanvasContainer = buildMockElement()
		spyOn(window.document, 'querySelector').and.returnValue(mockCanvasContainer)

		spyOn(insertElementRightAfter, 'default')

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
		expect(returnedEffectTogglesContainer.style.padding).toBe('20px')
	})

	it('inserts the effect toggles container after the canvas', () => {
		expect(insertElementRightAfter.default).toHaveBeenCalledWith(returnedEffectTogglesContainer, mockCanvasContainer)
	})
})
