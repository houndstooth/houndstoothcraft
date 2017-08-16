import store from '../../../store'
import setupContexts from '../../../src/application/setupContexts'

describe('background color', () => {
	let mockContext, mockCanvas, mockFillRect
	beforeEach(() => {
		mockFillRect = jasmine.createSpy()
		mockCanvas = {
			getContext: context => context === '2d' ? mockContext : null,
			width: 500,
			height: 600,
		}
		mockContext = { fillRect: mockFillRect }
		store.canvases.push(mockCanvas)
	})

	it('by default does nothing', () => {
		setupContexts()

		expect(mockContext.fillStyle).toBe(undefined)
		expect(mockFillRect).not.toHaveBeenCalled()
	})

	it('fills the background color when set', () => {
		store.mainHoundstooth.basePattern = { colorSettings: { backgroundColor: [ { r: 1, g: 1, b: 1, a: 1 } ] } }
		setupContexts()

		expect(mockContext.fillStyle).toBe('rgba(1,1,1,1)')
		expect(mockFillRect).toHaveBeenCalledWith(0, 0, 500, 600)
	})
})
