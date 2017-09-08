import interfaceUtilities from '../../../src/utilities/interfaceUtilities'
import store from '../../../store'

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

describe('#layerIterator', () => {
	it('returns an array of numbers of each layer', () => {
		store.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }

		const iterator = interfaceUtilities.layerIterator()

		expect(iterator).toEqual([ 0,1,2,3,4,5 ])
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
