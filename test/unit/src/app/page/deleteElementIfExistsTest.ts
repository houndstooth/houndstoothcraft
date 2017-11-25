import Spy = jasmine.Spy
import { deleteElementIfExists, documentWrapper, PageElement } from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('delete element if exists', () => {
	describe('when element exists', () => {
		it('deletes it', () => {
			const parentNodeRemoveChildSpy: Spy = jasmine.createSpy('parentNodeRemoveChild')
			const element: PageElement = buildMockElement({ parentNodeRemoveChildSpy })
			spyOn(documentWrapper, 'querySelector').and.returnValue(element)

			deleteElementIfExists.main('.element')

			// tslint:disable-next-line:no-unsafe-any
			expect(documentWrapper.querySelector).toHaveBeenCalledWith('.element')
			expect(parentNodeRemoveChildSpy).toHaveBeenCalledWith(element)
		})
	})

	describe('when element does not exist', () => {
		it('does not fail', () => {
			spyOn(documentWrapper, 'querySelector').and.returnValue(undefined)

			// tslint:disable-next-line:no-unsafe-any
			deleteElementIfExists.main('.element')

			// tslint:disable-next-line:no-unsafe-any
			expect(documentWrapper.querySelector).toHaveBeenCalledWith('.element')
		})
	})
})
