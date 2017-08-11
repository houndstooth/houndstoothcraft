import interfaceUtilities from '../../../src/utilities/interfaceUtilities'

describe('insert element right after', () => {
	it('inserts an element right after another one', () => {
		const element = document.createElement('div')
		element.classList.add('element')

		const zoneForTestingInsertElementRightAfter = document.createElement('div')
		zoneForTestingInsertElementRightAfter.classList.add('zoneForTestingInsertElementRightAfter')

		const elementRightAfterWhichToInsert = document.createElement('div')
		elementRightAfterWhichToInsert.classList.add('elementRightAfterWhichToInsert')

		const elementRightBeforeWhichThisElementIsExpectedToLand = document.createElement('div')
		elementRightBeforeWhichThisElementIsExpectedToLand.classList.add('elementRightBeforeWhichThisElementIsExpectedToLand')

		zoneForTestingInsertElementRightAfter.appendChild(elementRightAfterWhichToInsert)
		zoneForTestingInsertElementRightAfter.appendChild(elementRightBeforeWhichThisElementIsExpectedToLand)
		document.body.appendChild(zoneForTestingInsertElementRightAfter)

		interfaceUtilities.insertElementRightAfter(element, elementRightAfterWhichToInsert)

		expect(zoneForTestingInsertElementRightAfter.children[0]).toBe(elementRightAfterWhichToInsert)
		expect(zoneForTestingInsertElementRightAfter.children[1]).toBe(element)
		expect(zoneForTestingInsertElementRightAfter.children[2]).toBe(elementRightBeforeWhichThisElementIsExpectedToLand)
	})
})
