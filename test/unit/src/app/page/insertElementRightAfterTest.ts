import Spy = jasmine.Spy
import { insertElementRightAfter, PageElement } from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('insert element right after', () => {
	it('inserts an element right after another one', () => {
		const parentNodeInsertBeforeSpy: Spy = jasmine.createSpy('parentNodeInsertBefore')
		const nextSibling: PageElement = buildMockElement()
		const elementRightAfterWhichToInsert: PageElement = buildMockElement({ parentNodeInsertBeforeSpy })
		elementRightAfterWhichToInsert.nextSibling = nextSibling
		const element: PageElement = buildMockElement()

		insertElementRightAfter.main(element, elementRightAfterWhichToInsert)

		expect(parentNodeInsertBeforeSpy).toHaveBeenCalledWith(element, nextSibling)
	})
})
