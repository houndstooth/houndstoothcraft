import { insertElementRightAfter } from '../../../../src/page/insertElementRightAfter'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('insert element right after', () => {
	it('inserts an element right after another one', () => {
		const parentNodeInsertBeforeSpy = jasmine.createSpy('parentNodeInsertBefore')
		const nextSibling = buildMockElement()
		const elementRightAfterWhichToInsert = buildMockElement({ parentNodeInsertBeforeSpy })
		elementRightAfterWhichToInsert.nextSibling = nextSibling
		const element = buildMockElement()

		insertElementRightAfter(element, elementRightAfterWhichToInsert)

		expect(parentNodeInsertBeforeSpy).toHaveBeenCalledWith(element, nextSibling)
	})
})
