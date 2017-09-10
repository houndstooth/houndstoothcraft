import documentUtilities from '../../../src/utilities/documentUtilities'

describe('document utilities', () => {
	describe('#deleteElementIfExists', () => {
		let deleteElementIfExists
		beforeEach(() => deleteElementIfExists = documentUtilities.deleteElementIfExists)

		describe('when element exists', () => {
			describe('when element is a direct child of the document body', () => {
				it('deletes it', () => {
					const element = document.createElement('div')
					element.classList.add('element')
					document.body.appendChild(element)

					expect(document.querySelector('.element')).toBeTruthy()

					deleteElementIfExists('.element')

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

					deleteElementIfExists('.element')

					expect(document.querySelector('.element')).not.toBeTruthy()
				})
			})
		})

		describe('when element does not exist', () => {
			it('does not fail', () => {
				expect(document.querySelector('.element')).not.toBeTruthy()

				deleteElementIfExists('.element')
			})
		})
	})

	describe('#insertElementRightAfter', () => {
		let insertElementRightAfter
		beforeEach(() => insertElementRightAfter = documentUtilities.insertElementRightAfter)

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

	describe('#setElementDimensions', () => {
		let setElementDimensions
		beforeEach(() => setElementDimensions = documentUtilities.setElementDimensions)

		it('sets the css styles width and height of the element, in pixels', () => {
			const element = document.createElement('div')

			setElementDimensions(element, [ 400, 500 ])

			expect(element.style.width).toBe('400px')
			expect(element.style.height).toBe('500px')
		})
	})
})
