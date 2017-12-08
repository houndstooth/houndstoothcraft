// import Spy = jasmine.Spy
// import { insertElementRightAfter, InsertElementRightAfter } from '../../../../../src'
// import { buildMockElement } from '../../../helpers'
//
// const subject: InsertElementRightAfter = insertElementRightAfter.default

// xdescribe('insert element right after', () => {
// 	it('inserts an element right after another one', () => {
// 		const parentNodeInsertBeforeSpy: Spy = jasmine.createSpy('parentNodeInsertBefore')
// 		const nextSibling: HTMLElement = buildMockElement() as HTMLElement
// 		const elementRightAfterWhichToInsert: HTMLElement = buildMockElement({ parentNodeInsertBeforeSpy }) as HTMLElement
// 		elementRightAfterWhichToInsert.nextSibling = nextSibling
// 		const element: HTMLElement = buildMockElement() as HTMLElement
//
// 		subject(element, elementRightAfterWhichToInsert)
//
// 		expect(parentNodeInsertBeforeSpy).toHaveBeenCalledWith(element, nextSibling)
// 	})
// })
