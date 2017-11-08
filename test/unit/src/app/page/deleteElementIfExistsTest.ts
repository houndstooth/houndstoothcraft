import Spy = jasmine.Spy
import { PageElement } from '../../../../../src/app/page'
import { deleteElementIfExists } from '../../../../../src/app/page/deleteElementIfExists'
import * as windowWrapper from '../../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('delete element if exists', () => {
	describe('when element exists', () => {
		it('deletes it', () => {
			const parentNodeRemoveChildSpy: Spy = jasmine.createSpy('parentNodeRemoveChild')
			const element: PageElement = buildMockElement({ parentNodeRemoveChildSpy })
			spyOn(windowWrapper.documentWrapper, 'querySelector').and.returnValue(element)

			deleteElementIfExists('.element')

			// tslint:disable-next-line:no-unsafe-any
			expect(windowWrapper.documentWrapper.querySelector).toHaveBeenCalledWith('.element')
			expect(parentNodeRemoveChildSpy).toHaveBeenCalledWith(element)
		})
	})

	describe('when element does not exist', () => {
		it('does not fail', () => {
			spyOn(windowWrapper.documentWrapper, 'querySelector').and.returnValue(undefined)

			// tslint:disable-next-line:no-unsafe-any
			deleteElementIfExists('.element')

			// tslint:disable-next-line:no-unsafe-any
			expect(windowWrapper.documentWrapper.querySelector).toHaveBeenCalledWith('.element')
		})
	})
})
