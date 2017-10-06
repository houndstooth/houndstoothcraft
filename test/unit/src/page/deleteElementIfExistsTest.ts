import deleteElementIfExists from '../../../../src/page/deleteElementIfExists'
import * as window from '../../../../src/utilities/windowWrapper'
import buildMockElement from '../../helpers/buildMockElement'

describe('delete element if exists', () => {
	describe('when element exists', () => {
		it('deletes it', () => {
			const parentNodeRemoveChildSpy = jasmine.createSpy('parentNodeRemoveChild')
			const element = buildMockElement({ parentNodeRemoveChildSpy })
			spyOn(window.document, 'querySelector').and.returnValue(element)

			deleteElementIfExists('.element')

			expect(window.document.querySelector).toHaveBeenCalledWith('.element')
			expect(parentNodeRemoveChildSpy).toHaveBeenCalledWith(element)
		})
	})

	describe('when element does not exist', () => {
		it('does not fail', () => {
			spyOn(window.document, 'querySelector').and.returnValue(undefined)

			deleteElementIfExists('.element')

			expect(window.document.querySelector).toHaveBeenCalledWith('.element')
		})
	})
})
