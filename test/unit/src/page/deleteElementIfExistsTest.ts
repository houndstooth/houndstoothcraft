import Spy = jasmine.Spy
import { PageElement } from '../../../../src/page'
import { deleteElementIfExists } from '../../../../src/page/deleteElementIfExists'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('delete element if exists', () => {
	describe('when element exists', () => {
		it('deletes it', () => {
			const parentNodeRemoveChildSpy: Spy = jasmine.createSpy('parentNodeRemoveChild')
			const element: PageElement = buildMockElement({ parentNodeRemoveChildSpy })
			spyOn(window.document, 'querySelector').and.returnValue(element)

			deleteElementIfExists('.element')

			// tslint:disable-next-line:no-unsafe-any
			expect(window.document.querySelector).toHaveBeenCalledWith('.element')
			expect(parentNodeRemoveChildSpy).toHaveBeenCalledWith(element)
		})
	})

	describe('when element does not exist', () => {
		it('does not fail', () => {
			spyOn(window.document, 'querySelector').and.returnValue(undefined)

			// tslint:disable-next-line:no-unsafe-any
			deleteElementIfExists('.element')

			// tslint:disable-next-line:no-unsafe-any
			expect(window.document.querySelector).toHaveBeenCalledWith('.element')
		})
	})
})
