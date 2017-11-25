import { Canvas, Context, createContext, documentWrapper, PageElement } from '../../../../../src'
import { buildMockContext } from '../../../../helpers'
import { buildMockCanvas, buildMockElement } from '../../../helpers'

describe('create context', () => {
	let returnedContext: Context
	let appendedCanvas: Canvas
	const context: Context = buildMockContext()
	beforeEach(() => {
		const canvas: Canvas = buildMockCanvas({ context })
		spyOn(documentWrapper, 'createElement').and.returnValue(canvas)

		const children: Canvas[] = []
		const canvasContainer: PageElement = buildMockElement({ children })

		returnedContext = createContext.default({ canvasContainer })

		appendedCanvas = children[0]
	})

	it('returns the 2d context of the new canvas', () => {
		expect(returnedContext).toBe(context)
	})

	it('sets this context\'s canvas\'s position to absolute, so they can stack', () => {
		if (appendedCanvas.style) {
			expect(appendedCanvas.style.position).toBe('absolute')
		}
		else {
			fail()
		}
	})
})
