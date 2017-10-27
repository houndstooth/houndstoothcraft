import { createWarningsContainer } from '../../../../src/page/createWarningsContainer'
import * as insertElementRightAfter from '../../../../src/page/insertElementRightAfter'
import { PageElement } from '../../../../src/page'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'
import Spy = jasmine.Spy

describe('create warnings container', () => {
	let returnedWarningsContainer: PageElement
	let effectTogglesContainer: PageElement
	let warningsContainer: PageElement
	let insertElementRightAfterSpy: Spy
	const warningsContainerClassList: string[] = []
	beforeAll(() => {
		warningsContainer = buildMockElement({ classList: warningsContainerClassList })
		spyOn(window.document, 'createElement').and.returnValue(warningsContainer)

		effectTogglesContainer = buildMockElement()
		spyOn(window.document, 'querySelector').and.returnValue(effectTogglesContainer)

		insertElementRightAfterSpy = spyOn(insertElementRightAfter, 'insertElementRightAfter')

		returnedWarningsContainer = createWarningsContainer()
	})

	it('returns the newly created warnings container', () => {
		expect(returnedWarningsContainer).toBe(warningsContainer)
	})

	it('creates the warnings container with padding', () => {
		if (!returnedWarningsContainer.style) {
			fail()
		}
		else {
			expect(returnedWarningsContainer.style.padding).toBe('20px')
		}
	})

	it('assigns a class to the warnings container', () => {
		const classAddedToWarningsContainer: string = warningsContainerClassList[0]
		expect(classAddedToWarningsContainer).toBe('warnings-container')
	})

	it('inserts the warnings container after the effect toggles container', () => {
		expect(insertElementRightAfterSpy).toHaveBeenCalledWith(returnedWarningsContainer, effectTogglesContainer)
	})
})
