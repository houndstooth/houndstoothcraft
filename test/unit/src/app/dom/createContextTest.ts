import { appState, Canvas, Context, createContext, documentWrapper, PageElement } from '../../../../../src'
import { buildMockCanvas, buildMockContext } from '../../../../helpers'
import { buildMockElement } from '../../../helpers'

const subject: (_: { canvasContainer: PageElement }) => Context = createContext.default

describe('create context', () => {
	let returnedContext: Context
	let appendedCanvas: Canvas
	let canvasContainer: PageElement
	let children: Canvas[]
	const context: Context = buildMockContext()
	beforeEach(() => {
		const canvas: Canvas = buildMockCanvas({ context })
		spyOn(documentWrapper, 'createElement').and.returnValue(canvas)

		children = []
		canvasContainer = buildMockElement({ children })

		returnedContext = subject({ canvasContainer })

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

	describe('with respect to animation', () => {
		it('when not animating, does not hide the main canvases', () => {
			expect(appendedCanvas.style.display).toBe('block')
		})

		it('when animating, hides the main canvases', () => {
			appState.controls.animating = true

			subject({ canvasContainer })
			appendedCanvas = children[0]

			expect(appendedCanvas.style.display).toBe('none')
		})
	})
})
