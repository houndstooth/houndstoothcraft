import deleteElementIfExists from '../../../src/display/deleteElementIfExists'

describe('delete element if exists', () => {
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
