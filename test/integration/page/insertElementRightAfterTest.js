import insertElementRightAfter from '../../../src/page/insertElementRightAfter'

describe('insert element right after', () => {
	it('inserts an element right after another one', () => {
		const element = document.createElement('div')
		const zoneForTestingInsertElementRightAfter = document.createElement('div')
		const elementRightAfterWhichToInsert = document.createElement('div')
		const elementRightBeforeWhichThisElementIsExpectedToLand = document.createElement('div')

		zoneForTestingInsertElementRightAfter.appendChild(elementRightAfterWhichToInsert)
		zoneForTestingInsertElementRightAfter.appendChild(elementRightBeforeWhichThisElementIsExpectedToLand)
		document.body.appendChild(zoneForTestingInsertElementRightAfter)

		insertElementRightAfter(element, elementRightAfterWhichToInsert)

		expect(zoneForTestingInsertElementRightAfter.children[ 0 ]).toBe(elementRightAfterWhichToInsert)
		expect(zoneForTestingInsertElementRightAfter.children[ 1 ]).toBe(element)
		expect(zoneForTestingInsertElementRightAfter.children[ 2 ]).toBe(elementRightBeforeWhichThisElementIsExpectedToLand)
	})
})
