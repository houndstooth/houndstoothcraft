import insertElementRightAfter from '../../../../src/page/insertElementRightAfter'
import buildMockElement from '../../helpers/buildMockElement'

describe('insert element right after', () => {
	it('inserts an element right after another one', () => {
		const parentNodeInsertBeforeSpy = jasmine.createSpy()
		const nextSibling = {}
		const elementRightAfterWhichToInsert = buildMockElement({ parentNodeInsertBeforeSpy })
		elementRightAfterWhichToInsert.nextSibling = nextSibling
		const element = {}

		insertElementRightAfter(element, elementRightAfterWhichToInsert)

		expect(parentNodeInsertBeforeSpy).toHaveBeenCalledWith(element, nextSibling)
	})
})
