import Spy = jasmine.Spy
import { insertElementRightAfter, InsertElementRightAfter, PageElement } from '../../../../../src'
import { buildMockElement } from '../../../helpers'

const subject: InsertElementRightAfter = insertElementRightAfter.default

describe('insert element right after', () => {
	it('inserts an element right after another one', () => {
		const parentNodeInsertBeforeSpy: Spy = jasmine.createSpy('parentNodeInsertBefore')
		const nextSibling: PageElement = buildMockElement()
		const elementRightAfterWhichToInsert: PageElement = buildMockElement({ parentNodeInsertBeforeSpy })
		elementRightAfterWhichToInsert.nextSibling = nextSibling
		const element: PageElement = buildMockElement()

		subject(element, elementRightAfterWhichToInsert)

		expect(parentNodeInsertBeforeSpy).toHaveBeenCalledWith(element, nextSibling)
	})
})
