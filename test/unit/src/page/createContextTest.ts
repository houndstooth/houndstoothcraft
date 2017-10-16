import createContext from '../../../../src/page/createContext'
import * as window from '../../../../src/utilities/windowWrapper'
import buildMockCanvas from '../../helpers/buildMockCanvas'
import buildMockContext from '../../../helpers/buildMockContext'
import Canvas from '../../../../src/page/types/Canvas'
import buildMockElement from '../../helpers/buildMockElement'

describe('create context', () => {
	let returnedContext
	let appendedCanvas
	const mockContext = buildMockContext()
	beforeEach(() => {
		const mockCanvas = buildMockCanvas({ mockContext })
		spyOn(window.document, 'createElement').and.returnValue(mockCanvas)

		const mockChildren = [] as Canvas[]
		const canvasContainer = buildMockElement({ mockChildren })

		returnedContext = createContext({ canvasContainer, canvasDimensions: [ 350, 600 ] as any })

		appendedCanvas = mockChildren[0]
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
