import createContext from '../../../src/page/createContext'

describe('create context', () => {
	let canvasContainer, returnedContext, canvasContext
	beforeEach(() => {
		const mockCanvas = document.createElement('canvas')
		canvasContainer = document.createElement('div')

		canvasContext = {}
		mockCanvas.getContext = contextType => contextType === '2d' ? canvasContext : null
		spyOn(document, 'createElement').and.returnValue(mockCanvas)

		returnedContext = createContext({ canvasContainer, canvasSize: [ 350, 600 ] })
	})

	it('sets canvas position to absolute', () => {
		expect(canvasContainer.firstChild.style.position).toBe('absolute')
	})

	it('sets canvas width and height', () => {
		expect(canvasContainer.firstChild.width).toBe(350)
		expect(canvasContainer.firstChild.height).toBe(600)
	})

	it('returns the 2d context of the canvas', () => {
		expect(returnedContext).toBe(canvasContext)
	})
})
