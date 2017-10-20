import { getCanvasDimensions } from '../../../../src/canvas/getCanvasDimensions'
import { state } from '../../../../src/state'
import { DEFAULT_CANVAS_SIZE } from '../../../../src/store/defaults'

describe('get canvas dimensions', () => {
	describe('when canvas size is not specified', () => {
		it('sets each of the width and height of the canvas to the default canvas size', () => {
			const canvasDimensions = getCanvasDimensions()

			expect(canvasDimensions[ 0 ] as any).toBe(DEFAULT_CANVAS_SIZE)
			expect(canvasDimensions[ 1 ] as any).toBe(DEFAULT_CANVAS_SIZE)
		})
	})

	describe('when the canvas size is specified', () => {
		it('sets width and height to the same when only one number is provided', () => {
			state.mainHoundstooth.basePattern = { viewSettings: { canvasSize: 350 as any } }

			const canvasDimensions = getCanvasDimensions()

			expect(canvasDimensions[ 0 ] as any).toBe(350)
			expect(canvasDimensions[ 1 ] as any).toBe(350)
		})
	})
})
