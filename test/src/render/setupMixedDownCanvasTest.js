import setupMixedDownCanvas from '../../../src/render/setupMixedDownCanvas'
import store from '../../../store'
import interfaceUtilities from '../../../src/utilities/interfaceUtilities'

let mixedDownCanvas

describe('setup mixed down canvas', () => {
	beforeEach(() => interfaceUtilities.deleteElementIfExists('.mixed-down-canvas'))

	describe('when the mixed down canvas is already on the document', () => {
		let newMixedDownCanvas
		beforeEach(() => {
			mixedDownCanvas = document.createElement('canvas')
			mixedDownCanvas.classList.add('mixed-down-canvas')
			document.body.appendChild(mixedDownCanvas)

			setupMixedDownCanvas()

			newMixedDownCanvas = document.querySelector('.mixed-down-canvas')
		})

		it('deletes the existing mixed down canvas', () => {
			expect(newMixedDownCanvas).not.toBe(mixedDownCanvas)
		})

		it('points the mixed down canvas node of the store at it', () => {
			expect(store.mixedDownCanvas).toBe(newMixedDownCanvas)
		})
	})

	describe('when the mixed down canvas is not already on the document', () => {
		beforeEach(() => {
			setupMixedDownCanvas.__Rewire__('getCanvasSize', () => [ 400, 500 ])

			setupMixedDownCanvas()
			mixedDownCanvas = document.querySelector('.mixed-down-canvas')
		})

		it('creates a mixed down canvas and puts it on the document and the store', () => {
			expect(mixedDownCanvas).toBeTruthy()
		})

		it('puts this canvas on the store', () => {
			expect(store.mixedDownCanvas).toBe(mixedDownCanvas)
		})

		it('does not display this canvas', () => {
			expect(mixedDownCanvas.style.display).toBe('none')
		})

		it('sets the canvas size', () => {
			expect(mixedDownCanvas.width).toBe(400)
			expect(mixedDownCanvas.height).toBe(500)
		})
	})
})