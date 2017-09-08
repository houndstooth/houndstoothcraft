import interfaceUtilities from '../../../src/utilities/interfaceUtilities'

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

describe('#setElementDimensions', () => {
	it('sets the css styles width and height of the element, in pixels', () => {
		const element = document.createElement('div')

		interfaceUtilities.setElementDimensions(element, [ 400, 500 ])

		expect(element.style.width).toBe('400px')
		expect(element.style.height).toBe('500px')
	})
})
