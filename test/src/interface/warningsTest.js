let controls
import interfaceUtilities from '../../../src/utilities/interfaceUtilities'

describe('warnings', () => {
	beforeEach(() => {
		delete require.cache[ require.resolve('../../../src/interface/warnings') ]
		delete require.cache[ require.resolve('../../../src/interface/controls') ]
		controls = require('../../../src/interface/controls').default

		interfaceUtilities.deleteElementIfExists('.warnings')
	})

	describe('when the warnings already exist on the document', () => {
		let warnings
		beforeEach(() => {
			warnings = document.createElement('div')
			warnings.classList.add('warnings')
			document.body.appendChild(warnings)
		})

		it('returns the warnings', () => {
			const returnedWarnings = require('../../../src/interface/warnings').default

			expect(returnedWarnings.isSameNode(warnings)).toBe(true)
		})
	})

	describe('when the warnings do not already exist on the document', () => {
		let returnedWarnings
		beforeEach(() => {
			spyOn(interfaceUtilities, 'insertElementRightAfter').and.callThrough()
			returnedWarnings = require('../../../src/interface/warnings').default
		})

		it('returns the newly created warnings', () => {
			const realWarnings = document.querySelector('.warnings')
			expect(returnedWarnings.isSameNode(realWarnings)).toBe(true)
		})

		it('creates the warnings and adds them to the document', () => {
			const expectedWarnings = document.createElement('div')
			expectedWarnings.classList.add('warnings')
			expect(returnedWarnings.isEqualNode(expectedWarnings)).toBe(true)
		})

		it('inserts the warnings after the controls', () => {
			expect(interfaceUtilities.insertElementRightAfter).toHaveBeenCalledWith(returnedWarnings, controls)
		})
	})
})
