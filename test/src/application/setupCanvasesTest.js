import setupCanvases from '../../../src/application/setupCanvases'
import houndstoothDefaults from '../../../src/store/houndstoothDefaults'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'

describe('setup canvases', () => {
	beforeEach(() => resetStore(store))

	// describe('canvas size', () => {
	// 	let mockCanvas
	// 	beforeEach(() => {
	// 		mockCanvas = {}
	// 		setupCanvas.__Rewire__('canvas', mockCanvas)
	// 	})
	//
	// 	it('sets the width and height of the canvas', () => {
	// 		setupCanvas()
	//
	// 		expect(mockCanvas.height).toBe(houndstoothDefaults.CANVAS_SIZE)
	// 		expect(mockCanvas.width).toBe(houndstoothDefaults.CANVAS_SIZE)
	// 	})
	//
	// 	it('uses custom canvas size', () => {
	// 		store.mainHoundstooth.basePattern = { viewSettings: { canvasSize: 450 } }
	//
	// 		setupCanvas()
	//
	// 		expect(mockCanvas.height).toBe(450)
	// 		expect(mockCanvas.width).toBe(450)
	// 	})
	// })
})

// describe('canvas', () => {
// 	beforeEach(() => {
// 		delete require.cache[ require.resolve('../../../src/interface/canvas') ]
//
// 		const preexistingCanvas = document.querySelector('.realCanvas')
// 		if (preexistingCanvas) preexistingCanvas.parentNode.removeChild(preexistingCanvas)
// 	})
//
// 	describe('when the canvas already exists on the document', () => {
// 		let realCanvas
// 		beforeEach(() => {
// 			realCanvas = document.createElement('canvas')
// 			realCanvas.classList.add('realCanvas')
// 			document.body.appendChild(realCanvas)
// 		})
//
// 		it('returns the canvas', () => {
// 			const returnedCanvas = require('../../../src/interface/canvases').default
//
// 			expect(returnedCanvas.isSameNode(realCanvas)).toBe(true)
// 		})
// 	})
//
// 	describe('when the canvas does not already exist on the document', () => {
// 		let returnedCanvas
// 		beforeEach(() => returnedCanvas = require('../../../src/interface/canvases').default)
//
// 		it('returns the newly created canvas', () => {
// 			const realCanvas = document.querySelector('.realCanvas')
// 			expect(returnedCanvas.isSameNode(realCanvas)).toBe(true)
// 		})
//
// 		it('creates the canvas and adds it to the document', () => {
// 			const expectedCanvas = document.createElement('canvas')
// 			expectedCanvas.classList.add('realCanvas')
// 			expect(returnedCanvas.isEqualNode(expectedCanvas)).toBe(true)
// 		})
// 	})
// })

