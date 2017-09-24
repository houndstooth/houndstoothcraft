import createContext from '../../../src/page/createContext'
import * as window from '../../../src/utilities/windowWrapper'
import buildMockCanvas from '../helpers/buildMockCanvas'

describe('create context', () => {
	let returnedContext, appendedCanvas
	const mockContext = {}
	beforeEach(() => {
		const canvas = buildMockCanvas({ mockContext })
		spyOn(window.document, 'createElement').and.returnValue(canvas)

		const mockCanvases = []
		const canvasContainer = { appendChild: canvas => mockCanvases.push(canvas)}


		returnedContext = createContext({ canvasContainer, canvasSize: [ 350, 600 ] })


		appendedCanvas = mockCanvases[0]
	})

	it('returns the 2d context of the new canvas', () => {
		expect(returnedContext).toBe(mockContext)
	})

	it('sets this context\'s canvas\'s position to absolute', () => {
		expect(appendedCanvas.style.position).toBe('absolute')
	})

	it('sets this context\'s canvas\'s width and height', () => {
		expect(appendedCanvas.width).toBe(350)
		expect(appendedCanvas.height).toBe(600)
	})
})
