import deleteElementIfExists from '../../../src/interface/deleteElementIfExists'
import setupWarnings from '../../../src/interface/setupWarnings'
import insertElementRightAfter from '../../../src/interface/insertElementRightAfter'

describe('setup warnings', () => {
	let returnedWarnings
	let insertElementRightAfterSpy
	beforeEach(() => {
		deleteElementIfExists('.warnings')

		insertElementRightAfterSpy = jasmine.createSpy().and.callFake(insertElementRightAfter)
		setupWarnings.__Rewire__('insertElementRightAfter', insertElementRightAfterSpy)

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
		expect(insertElementRightAfterSpy).toHaveBeenCalledWith(returnedWarnings, effectTogglesContainer)
	})
})
