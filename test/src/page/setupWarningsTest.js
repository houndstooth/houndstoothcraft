import deleteElementIfExists from '../../../src/page/deleteElementIfExists'
import setupWarnings from '../../../src/page/setupWarnings'
import * as insertElementRightAfter from '../../../src/page/insertElementRightAfter'

describe('setup warnings', () => {
	let returnedWarnings
	beforeEach(() => {
		deleteElementIfExists('.warnings')

		spyOn(insertElementRightAfter, 'default').and.callThrough()

		returnedWarnings = setupWarnings()
	})

	it('returns the newly created warnings', () => {
		const realWarnings = document.querySelector('.warnings')
		expect(returnedWarnings).toBe(realWarnings)
	})

	it('creates the warnings and adds them to the document, with padding', () => {
		const expectedWarnings = document.createElement('div')
		expectedWarnings.classList.add('warnings')
		expectedWarnings.style.padding = '20px'

		expect(returnedWarnings).toEqual(expectedWarnings)
	})

	it('inserts the warnings after the effect toggles container', () => {
		const effectTogglesContainer = document.querySelector('.effect-toggles-container')
		expect(insertElementRightAfter.default).toHaveBeenCalledWith(returnedWarnings, effectTogglesContainer)
	})
})
