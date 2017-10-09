import createWarningsContainer from '../../../../src/page/createWarningsContainer'
import * as insertElementRightAfter from '../../../../src/page/insertElementRightAfter'
import * as window from '../../../../src/utilities/windowWrapper'
import buildMockElement from '../../helpers/buildMockElement'

describe('create warnings container', () => {
	let returnedWarningsContainer
	let mockEffectTogglesContainer
	let mockWarningsContainer
	let insertElementRightAfterSpy
	const mockWarningsContainerClassList = []
	beforeAll(() => {
		mockWarningsContainer = buildMockElement({ mockClassList: mockWarningsContainerClassList })
		spyOn(window.document, 'createElement').and.returnValue(mockWarningsContainer)

		mockEffectTogglesContainer = buildMockElement()
		spyOn(window.document, 'querySelector').and.returnValue(mockEffectTogglesContainer)

		insertElementRightAfterSpy = spyOn(insertElementRightAfter, 'default')

		returnedWarningsContainer = createWarningsContainer()
	})

	it('returns the newly created warnings container', () => {
		expect(returnedWarningsContainer).toBe(mockWarningsContainer)
	})

	it('creates the warnings container with padding', () => {
		expect(returnedWarningsContainer.style.padding).toBe('20px')
	})

	it('assigns a class to the warnings container', () => {
		const classAddedToWarningsContainer = mockWarningsContainerClassList[0]
		expect(classAddedToWarningsContainer).toBe('warnings-container')
	})

	it('inserts the warnings container after the effect toggles container', () => {
		expect(insertElementRightAfterSpy).toHaveBeenCalledWith(returnedWarningsContainer, mockEffectTogglesContainer)
	})
})
