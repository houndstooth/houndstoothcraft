import Spy = jasmine.Spy
import { PageElement } from '../../../../../src/app/page'
import { insertElementRightAfter } from '../../../../../src/app/page/insertElementRightAfter'
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('insert element right after', () => {
	it('inserts an element right after another one', () => {
		const parentNodeInsertBeforeSpy: Spy = jasmine.createSpy('parentNodeInsertBefore')
		const nextSibling: PageElement = buildMockElement()
		const elementRightAfterWhichToInsert: PageElement = buildMockElement({ parentNodeInsertBeforeSpy })
		elementRightAfterWhichToInsert.nextSibling = nextSibling
		const element: PageElement = buildMockElement()

		insertElementRightAfter(element, elementRightAfterWhichToInsert)

		expect(parentNodeInsertBeforeSpy).toHaveBeenCalledWith(element, nextSibling)
	})
})