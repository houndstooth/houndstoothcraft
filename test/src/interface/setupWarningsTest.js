import interfaceUtilities from '../../../src/utilities/interfaceUtilities'
import setupWarnings from '../../../src/interface/setupWarnings'

describe('setup warnings', () => {
	let returnedWarnings
	beforeEach(() => {
		interfaceUtilities.deleteElementIfExists('.warnings')

		spyOn(interfaceUtilities, 'insertElementRightAfter').and.callThrough()

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
		expect(interfaceUtilities.insertElementRightAfter).toHaveBeenCalledWith(returnedWarnings, effectTogglesContainer)
	})
})
