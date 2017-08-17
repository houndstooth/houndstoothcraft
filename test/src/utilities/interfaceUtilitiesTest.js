import interfaceUtilities from '../../../src/utilities/interfaceUtilities'
import store from '../../../store'

describe('#insertElementRightAfter', () => {
	it('inserts an element right after another one', () => {
		const element = document.createElement('div')
		const zoneForTestingInsertElementRightAfter = document.createElement('div')
		const elementRightAfterWhichToInsert = document.createElement('div')
		const elementRightBeforeWhichThisElementIsExpectedToLand = document.createElement('div')

		zoneForTestingInsertElementRightAfter.appendChild(elementRightAfterWhichToInsert)
		zoneForTestingInsertElementRightAfter.appendChild(elementRightBeforeWhichThisElementIsExpectedToLand)
		document.body.appendChild(zoneForTestingInsertElementRightAfter)

		interfaceUtilities.insertElementRightAfter(element, elementRightAfterWhichToInsert)

		expect(zoneForTestingInsertElementRightAfter.children[ 0 ]).toBe(elementRightAfterWhichToInsert)
		expect(zoneForTestingInsertElementRightAfter.children[ 1 ]).toBe(element)
		expect(zoneForTestingInsertElementRightAfter.children[ 2 ]).toBe(elementRightBeforeWhichThisElementIsExpectedToLand)
	})
})

describe('#deleteElementIfExists', () => {
	describe('when element exists', () => {
		describe('when element is a direct child of the document body', () => {
			it('deletes it', () => {
				const element = document.createElement('div')
				element.classList.add('element')
				document.body.appendChild(element)

				expect(document.querySelector('.element')).toBeTruthy()

				interfaceUtilities.deleteElementIfExists('.element')

				expect(document.querySelector('.element')).not.toBeTruthy()
			})
		})

		describe('when the element is a child of another element', () => {
			it('deletes it', () => {
				const element = document.createElement('div')
				element.classList.add('element')
				const parentElement = document.createElement('div')
				parentElement.appendChild(element)
				document.body.appendChild(parentElement)

				expect(document.querySelector('.element')).toBeTruthy()

				interfaceUtilities.deleteElementIfExists('.element')

				expect(document.querySelector('.element')).not.toBeTruthy()
			})
		})
	})

	describe('when element does not exist', () => {
		it('does not fail', () => {
			expect(document.querySelector('.element')).not.toBeTruthy()

			interfaceUtilities.deleteElementIfExists('.element')
		})
	})
})

describe('#iterationFrameIterator', () => {
	it('returns an array of numbers of each iteration frame', () => {
		store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 5 }

		const iterator = interfaceUtilities.iterationFrameIterator()

		expect(iterator).toEqual([0,1,2,3,4,5])
	})
})
