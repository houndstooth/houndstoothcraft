import setupCanvas from '../../../src/application/setupCanvas'
import houndstoothDefaults from '../../../src/store/houndstoothDefaults'
import store from '../../../store'
import resetStore from '../../helpers/resetStore'

describe('setup canvas', () => {
	beforeEach(() => resetStore(store))

	describe('canvas size', () => {
		let mockCanvas
		beforeEach(() => {
			mockCanvas = {}
			setupCanvas.__Rewire__('canvas', mockCanvas)
		})

		it('sets the width and height of the canvas', () => {
			setupCanvas()

			expect(mockCanvas.height).toBe(houndstoothDefaults.CANVAS_SIZE)
			expect(mockCanvas.width).toBe(houndstoothDefaults.CANVAS_SIZE)
		})

		it('uses custom canvas size', () => {
			store.mainHoundstooth.basePattern = { viewSettings: { canvasSize: 450 } }

			setupCanvas()

			expect(mockCanvas.height).toBe(450)
			expect(mockCanvas.width).toBe(450)
		})
	})

	describe('background color', () => {
		let mockContext, mockFillRect
		beforeEach(() => {
			mockFillRect = jasmine.createSpy()
			mockContext = { fillRect: mockFillRect }
			setupCanvas.__Rewire__('context', mockContext)
		})

		it('by default does nothing', () => {
			setupCanvas()

			expect(mockContext.fillStyle).toBe(undefined)
			expect(mockFillRect).not.toHaveBeenCalled()
		})

		it('fills the background color when set', () => {
			store.mainHoundstooth.basePattern = { colorSettings: { backgroundColor: [{ r: 1, g: 1, b: 1, a: 1 }] } }
			setupCanvas()

			expect(mockContext.fillStyle).toBe('rgba(1,1,1,1)')
			expect(mockFillRect).toHaveBeenCalledWith(0, 0, houndstoothDefaults.CANVAS_SIZE, houndstoothDefaults.CANVAS_SIZE)
		})
	})
})
