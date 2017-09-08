import deleteElementIfExists from '../../../src/interface/deleteElementIfExists'
import setupWarnings from '../../../src/interface/setupWarnings'
import theInterface from '../../../src/interface'

describe('setup warnings', () => {
	let returnedWarnings
	beforeEach(() => {
		deleteElementIfExists('.warnings')

		spyOn(theInterface, 'insertElementRightAfter').and.callThrough()

		returnedWarnings = setupWarnings()
	})

	it('returns the newly created warnings', () => {
		const realWarnings = document.querySelector('.warnings')
		expect(returnedWarnings.isSameNode(realWarnings)).toBe(true)
	})

	it('creates the warnings and adds them to the document, with padding', () => {
		const expectedWarnings = document.createElement('div')
		expectedWarnings.classList.add('warnings')
		expectedWarnings.style.padding = '20px'

		expect(returnedWarnings.isEqualNode(expectedWarnings)).toBe(true)
	})

	it('inserts the warnings after the effect toggles container', () => {
		const effectTogglesContainer = document.querySelector('.effect-toggles-container')
		expect(theInterface.insertElementRightAfter).toHaveBeenCalledWith(returnedWarnings, effectTogglesContainer)
	})
})
