import deleteElementIfExists from '../../../src/page/deleteElementIfExists'
import createWarningsContainer from '../../../src/page/createWarningsContainer'
import * as insertElementRightAfter from '../../../src/page/insertElementRightAfter'

describe('create warnings container', () => {
	let returnedWarningsContainer
	beforeEach(() => {
		deleteElementIfExists('.warnings-container')

		spyOn(insertElementRightAfter, 'default').and.callThrough()

		returnedWarningsContainer = createWarningsContainer()
	})

	it('returns the newly created warnings container', () => {
		const realWarningsContainer = document.querySelector('.warnings-container')
		expect(returnedWarningsContainer).toBe(realWarningsContainer)
	})

	it('creates the warnings container and adds it to the document, with padding', () => {
		const expectedWarningsContainer = document.createElement('div')
		expectedWarningsContainer.classList.add('warnings-container')
		expectedWarningsContainer.style.padding = '20px'

		expect(returnedWarningsContainer).toEqual(expectedWarningsContainer)
	})

	it('inserts the warnings container after the effect toggles container', () => {
		const effectTogglesContainer = document.querySelector('.effect-toggles-container')
		expect(insertElementRightAfter.default).toHaveBeenCalledWith(returnedWarningsContainer, effectTogglesContainer)
	})
})
