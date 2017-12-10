import { appState, createContext, globalWrapper } from '../../../../../src'
import { buildMockCanvas, buildMockContext, buildMockElement } from '../../../helpers'

const subject: (_: { canvasContainer: HTMLElement }) => CanvasRenderingContext2D = createContext.default

describe('create context', () => {
	let returnedContext: CanvasRenderingContext2D
	let appendedCanvas: HTMLCanvasElement
	let canvasContainer: HTMLElement
	let children: HTMLCanvasElement[]
	const context: CanvasRenderingContext2D = buildMockContext() as CanvasRenderingContext2D
	beforeEach(() => {
		const canvas: HTMLCanvasElement = buildMockCanvas({ context }) as HTMLCanvasElement
		spyOn(globalWrapper.document, 'createElement').and.returnValue(canvas)

		children = []
		canvasContainer = buildMockElement({ children }) as HTMLElement

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
