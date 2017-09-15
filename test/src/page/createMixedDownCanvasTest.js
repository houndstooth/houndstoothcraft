import createMixedDownCanvas from '../../../src/page/createMixedDownCanvas'
import state from '../../../state'
import deleteElementIfExists from '../../../src/page/deleteElementIfExists'
import canvas from '../../../src/canvas/index'

describe('creates mixed down canvas', () => {
	beforeEach(() => deleteElementIfExists('.mixed-down-canvas'))

	describe('when the mixed down canvas is already on the document', () => {
		let mixedDownCanvas, newMixedDownCanvas, newMixedDownContext, foundMixedDownCanvas
		beforeEach(() => {
			mixedDownCanvas = document.createElement('canvas')
			mixedDownCanvas.classList.add('mixed-down-canvas')
			document.body.appendChild(mixedDownCanvas)

			newMixedDownContext = {}
			newMixedDownCanvas = document.createElement('canvas')
			newMixedDownCanvas.getContext = contextType => contextType === '2d' ? newMixedDownContext : NaN
			spyOn(document, 'createElement').and.returnValue(newMixedDownCanvas)

			createMixedDownCanvas()

			foundMixedDownCanvas = document.querySelector('.mixed-down-canvas')
		})

		it('deletes the existing mixed down canvas', () => {
			expect(foundMixedDownCanvas).not.toBe(mixedDownCanvas)
			expect(foundMixedDownCanvas).toBe(newMixedDownCanvas)
		})

		it('points the mixed down canvas node of the state at it', () => {
			expect(state.mixedDownContext).toBe(newMixedDownContext)
		})
	})

	describe('when the mixed down canvas is not already on the document', () => {
		let mixedDownCanvas, mixedDownContext, foundMixedDownCanvas
		beforeEach(() => {
			spyOn(canvas, 'getCanvasSize').and.returnValue([ 400, 500 ])

			mixedDownContext = {}
			mixedDownCanvas = document.createElement('canvas')
			mixedDownCanvas.getContext = contextType => contextType === '2d' ? mixedDownContext : NaN
			spyOn(document, 'createElement').and.returnValue(mixedDownCanvas)

			createMixedDownCanvas()
			foundMixedDownCanvas = document.querySelector('.mixed-down-canvas')
		})

		it('creates a mixed down canvas and puts it on the document and the state', () => {
			expect(foundMixedDownCanvas).toBeTruthy()
		})

		it('puts this canvas on the state', () => {
			expect(state.mixedDownContext).toBe(mixedDownContext)
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
