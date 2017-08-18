import setupCanvases from '../../../src/application/setupCanvases'
import houndstoothDefaults from '../../../src/store/houndstoothDefaults'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import '../../../src/interface/canvasContainer'
import interfaceUtilities from '../../../src/utilities/interfaceUtilities'
import canvasContainer from '../../../src/interface/canvasContainer'

describe('setup canvases', () => {
	beforeEach(() => resetStore(store))

	describe('canvas container', () => {
		it('sets its width and height (as style, in px)', () => {
			setupCanvases()

			expect(canvasContainer.style.height).toBe(`${houndstoothDefaults.CANVAS_SIZE}px`)
			expect(canvasContainer.style.width).toBe(`${houndstoothDefaults.CANVAS_SIZE}px`)
		})

		it('can use a custom canvas size', () => {
			store.mainHoundstooth.basePattern = { viewSettings: { canvasSize: 450 } }

			setupCanvases()

			expect(canvasContainer.style.height).toBe('450px')
			expect(canvasContainer.style.width).toBe('450px')
		})
	})

	describe('canvases', () => {
		it('sets their width and height', () => {
			setupCanvases()

			expect(store.canvases[ 0 ].height).toBe(houndstoothDefaults.CANVAS_SIZE)
			expect(store.canvases[ 0 ].width).toBe(houndstoothDefaults.CANVAS_SIZE)
		})

		it('can use a custom canvas size', () => {
			store.mainHoundstooth.basePattern = { viewSettings: { canvasSize: 450 } }

			setupCanvases()

			expect(store.canvases[ 0 ].width).toBe(450)
			expect(store.canvases[ 0 ].width).toBe(450)
		})
	})

	describe('when none of the canvases exist on the page already', () => {
		beforeEach(() => {
			store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 5 }

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
		store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 5 }
		setupCanvases()

		expect(document.querySelector('.real-canvas-5')).toBeTruthy()
		expect(store.canvases.length).toBe(6)

		store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 3 }
		setupCanvases()

		expect(document.querySelector('.real-canvas-5')).not.toBeTruthy()
		expect(store.canvases.length).toBe(4)
	})
})
