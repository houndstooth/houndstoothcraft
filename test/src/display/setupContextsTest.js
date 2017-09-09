import store from '../../../store'
import setupContexts from '../../../src/display/setupContexts'
import resetStore from '../../../src/store/resetStore'

describe('setup contexts', () => {
	beforeEach(() => resetStore(store))

	it('sets the canvas container width and height (as style, in px)', () => {
		setupContexts.__Rewire__('getCanvasSize', () => [ 400, 500 ])

		setupContexts()

		const canvasContainer = document.querySelector('.canvas-container')
		expect(canvasContainer.style.width).toBe('400px')
		expect(canvasContainer.style.height).toBe('500px')
	})

	it('sets canvases width and height', () => {
		setupContexts.__Rewire__('getCanvasSize', () => [ 400, 500 ])

		setupContexts()

		const canvasContainer = document.querySelector('.canvas-container')
		expect(canvasContainer.firstChild.width).toBe(400)
		expect(canvasContainer.firstChild.height).toBe(500)
	})

	it('sets canvas positions to absolute', () => {
		setupContexts()

		const canvasContainer = document.querySelector('.canvas-container')
		expect(canvasContainer.firstChild.style.position).toBe('absolute')
	})

	it('adds contexts to the store for each layer', () => {
		store.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }
		expect(store.contexts.length).toBe(0)

		setupContexts()

		expect(store.contexts.length).toBe(6)
	})

	it('can reduce the count of contexts in the store, and canvases on the page', () => {
		store.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }
		setupContexts()

		const canvasContainer = document.querySelector('.canvas-container')
		expect(canvasContainer.children.length).toBe(6)
		expect(store.contexts.length).toBe(6)

		store.mainHoundstooth.basePattern.layerSettings = { endLayer: 3 }
		setupContexts()

		expect(canvasContainer.children.length).toBe(4)
		expect(store.contexts.length).toBe(4)
	})
})
