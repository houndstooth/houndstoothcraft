import getCanvasDimensions from '../../../../src/canvas/getCanvasDimensions'
import { DEFAULT_CANVAS_SIZE } from '../../../../src/store/defaults'
import state from '../../../../src/state'

describe('get canvas dimensions', () => {
	describe('when canvas size is not specified', () => {
		it('sets each of the width and height of the canvas to the default canvas size', () => {
			const canvasDimensions = getCanvasDimensions()

			expect(canvasDimensions[ 0 ]).toBe(DEFAULT_CANVAS_SIZE)
			expect(canvasDimensions[ 1 ]).toBe(DEFAULT_CANVAS_SIZE)
		})
	})

	describe('when the canvas size is specified', () => {
		it('uses this custom canvas size', () => {
			state.mainHoundstooth.basePattern = { viewSettings: { canvasSize: [ 350, 450 ] } }

			const canvasDimensions = getCanvasDimensions()

			expect(canvasDimensions[ 0 ]).toBe(350)
			expect(canvasDimensions[ 1 ]).toBe(450)
		})

		it('sets width and height to the same when only one number is provided', () => {
			state.mainHoundstooth.basePattern = { viewSettings: { canvasSize: 350 } }

			const canvasDimensions = getCanvasDimensions()

			expect(canvasDimensions[ 0 ]).toBe(350)
			expect(canvasDimensions[ 1 ]).toBe(350)
		})
	})
})
