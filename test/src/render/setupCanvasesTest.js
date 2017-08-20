import setupCanvases from '../../../src/render/setupCanvases'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import interfaceUtilities from '../../../src/utilities/interfaceUtilities'

describe('setup canvases', () => {
	beforeEach(() => resetStore(store))

	it('sets the canvas container width and height (as style, in px)', () => {
		setupCanvases.__Rewire__('getCanvasSize', () => [ 400, 500 ])

		setupCanvases()

		const canvasContainer = document.querySelector('.canvas-container')
		expect(canvasContainer.style.width).toBe('400px')
		expect(canvasContainer.style.height).toBe('500px')
	})

	it('sets canvases width and height', () => {
		setupCanvases.__Rewire__('getCanvasSize', () => [ 400, 500 ])

		setupCanvases()

		expect(store.canvases[ 0 ].width).toBe(400)
		expect(store.canvases[ 0 ].height).toBe(500)
	})

	describe('when none of the canvases exist on the page already', () => {
		beforeEach(() => {
			store.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }

			interfaceUtilities.deleteElementIfExists('.real-canvas-0')
			interfaceUtilities.deleteElementIfExists('.real-canvas-1')
			interfaceUtilities.deleteElementIfExists('.real-canvas-2')
			interfaceUtilities.deleteElementIfExists('.real-canvas-3')
			interfaceUtilities.deleteElementIfExists('.real-canvas-4')
			interfaceUtilities.deleteElementIfExists('.real-canvas-5')
		})

		it('creates them all and adds them to the canvas container', () => {
			const canvasContainer = document.querySelector('.canvas-container')

			expect(canvasContainer.querySelector('.real-canvas-0')).not.toBeTruthy()
			expect(canvasContainer.querySelector('.real-canvas-1')).not.toBeTruthy()
			expect(canvasContainer.querySelector('.real-canvas-2')).not.toBeTruthy()
			expect(canvasContainer.querySelector('.real-canvas-3')).not.toBeTruthy()
			expect(canvasContainer.querySelector('.real-canvas-4')).not.toBeTruthy()
			expect(canvasContainer.querySelector('.real-canvas-5')).not.toBeTruthy()

			setupCanvases()

			expect(canvasContainer.querySelector('.real-canvas-0')).toBeTruthy()
			expect(canvasContainer.querySelector('.real-canvas-1')).toBeTruthy()
			expect(canvasContainer.querySelector('.real-canvas-2')).toBeTruthy()
			expect(canvasContainer.querySelector('.real-canvas-3')).toBeTruthy()
			expect(canvasContainer.querySelector('.real-canvas-4')).toBeTruthy()
			expect(canvasContainer.querySelector('.real-canvas-5')).toBeTruthy()
		})

		it('adds them to the store', () => {
			expect(store.canvases.length).toBe(0)

			setupCanvases()

			expect(store.canvases.length).toBe(6)
		})

		it('sets their positions to absolute', () => {
			setupCanvases()

			expect(store.canvases[ 0 ].style.position).toBe('absolute')
		})
	})

	it('can reduce the count of canvases on the page and in the store', () => {
		store.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }
		setupCanvases()

		expect(document.querySelector('.real-canvas-5')).toBeTruthy()
		expect(store.canvases.length).toBe(6)

		store.mainHoundstooth.basePattern.layerSettings = { endLayer: 3 }
		setupCanvases()

		expect(document.querySelector('.real-canvas-5')).not.toBeTruthy()
		expect(store.canvases.length).toBe(4)
	})
})
