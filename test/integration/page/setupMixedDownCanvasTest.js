import setupMixedDownCanvas from '../../../src/page/setupMixedDownCanvas'
import state from '../../../state'
import deleteElementIfExists from '../../../src/page/deleteElementIfExists'
import canvas from '../../../src/canvas'

let mixedDownCanvas

describe('setup mixed down canvas', () => {
	beforeEach(() => deleteElementIfExists('.mixed-down-canvas'))

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

		it('points the mixed down canvas node of the state at it', () => {
			expect(state.mixedDownContext).toBe(newMixedDownCanvas.getContext('2d'))
		})
	})

	describe('when the mixed down canvas is not already on the document', () => {
		beforeEach(() => {
			spyOn(canvas, 'getCanvasSize').and.returnValue([ 400, 500 ])

			setupMixedDownCanvas()
			mixedDownCanvas = document.querySelector('.mixed-down-canvas')
		})

		it('creates a mixed down canvas and puts it on the document and the state', () => {
			expect(mixedDownCanvas).toBeTruthy()
		})

		it('puts this canvas on the state', () => {
			expect(state.mixedDownContext).toBe(mixedDownCanvas.getContext('2d'))
		})

		it('does not canvas this canvas', () => {
			expect(mixedDownCanvas.style.canvas).toBe('none')
		})

		it('sets the canvas size', () => {
			expect(mixedDownCanvas.width).toBe(400)
			expect(mixedDownCanvas.height).toBe(500)
		})
	})
})
