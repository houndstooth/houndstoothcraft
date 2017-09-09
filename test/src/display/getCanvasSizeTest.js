import getCanvasSize from '../../../src/display/getCanvasSize'
import store from '../../../src/store'
import state from '../../../state'

describe('get canvas size', () => {
	describe('when canvas size is not specified', () => {
		it('sets the width and height of the canvas to the default', () => {
			const canvasSize = getCanvasSize()

			expect(canvasSize[ 0 ]).toBe(store.houndstoothDefaults.CANVAS_SIZE)
			expect(canvasSize[ 1 ]).toBe(store.houndstoothDefaults.CANVAS_SIZE)
		})
	})

	describe('when the canvas size is specified', () => {
		it('uses custom canvas size', () => {
			state.mainHoundstooth.basePattern = { viewSettings: { canvasSize: [ 350, 450 ] } }

			const canvasSize = getCanvasSize()

			expect(canvasSize[ 0 ]).toBe(350)
			expect(canvasSize[ 1 ]).toBe(450)
		})

		it('sets width and height to the same when only one number is provided', () => {
			state.mainHoundstooth.basePattern = { viewSettings: { canvasSize: 350 } }

			const canvasSize = getCanvasSize()

			expect(canvasSize[ 0 ]).toBe(350)
			expect(canvasSize[ 1 ]).toBe(350)
		})
	})
})
