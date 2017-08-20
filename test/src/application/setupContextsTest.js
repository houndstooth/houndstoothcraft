import store from '../../../store'
import setupCanvases from '../../../src/application/setupCanvases'
import setupContexts from '../../../src/application/setupContexts'
import resetStore from '../../../src/store/resetStore'

describe('background color', () => {
	it('adds a context to the store for each canvas', () => {
		store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 5 }
		setupCanvases()
		expect(store.canvases.length).toBe(6)
		expect(store.contexts.length).toBe(0)

		setupContexts()

		expect(store.contexts.length).toBe(6)
	})

	it('can reduce the count of contexts in the store', () => {
		store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 5 }
		setupCanvases()
		setupContexts()

		expect(store.contexts.length).toBe(6)

		store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 3 }
		setupCanvases()
		setupContexts()

		expect(store.contexts.length).toBe(4)
	})

	describe('background color', () => {
		let mockContextOne, mockFillRectOne, mockContextTwo, mockFillRectTwo
		beforeEach(() => {
			resetStore(store)

			mockFillRectOne = jasmine.createSpy()
			mockContextOne = { fillRect: mockFillRectOne }
			const mockCanvasOne = {
				getContext: context => context === '2d' ? mockContextOne : null,
				width: 500,
				height: 600,
			}

			mockFillRectTwo = jasmine.createSpy()
			mockContextTwo = { fillRect: mockFillRectTwo }
			const mockCanvasTwo = {
				getContext: context => context === '2d' ? mockContextTwo : null,
				width: 500,
				height: 600,
			}

			store.canvases.push(mockCanvasOne)
			store.canvases.push(mockCanvasTwo)
		})

		it('by default does nothing', () => {
			setupContexts()

			expect(mockContextOne.fillStyle).toBe(undefined)
			expect(mockFillRectOne).not.toHaveBeenCalled()
			expect(mockContextTwo.fillStyle).toBe(undefined)
			expect(mockFillRectTwo).not.toHaveBeenCalled()
		})

		it('fills the background color when set', () => {
			store.mainHoundstooth.basePattern = { colorSettings: { backgroundColor: [ { r: 1, g: 1, b: 1, a: 1 } ] } }
			setupContexts()

			expect(mockContextOne.fillStyle).toBe('rgba(1,1,1,1)')
			expect(mockFillRectOne).toHaveBeenCalledWith(0, 0, 500, 600)
			expect(mockContextTwo.fillStyle).toBe('rgba(1,1,1,1)')
			expect(mockFillRectTwo).toHaveBeenCalledWith(0, 0, 500, 600)
		})
	})
})
