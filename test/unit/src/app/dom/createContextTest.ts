import { appState, createContext, globalWrapper } from '../../../../../src/indexForTest'
import { buildMockCanvas, buildMockElement } from '../../../helpers'

describe('create context', () => {
	let subject: () => CanvasRenderingContext2D
	let returnedContext: CanvasRenderingContext2D
	let appendedCanvas: HTMLCanvasElement
	let context: CanvasRenderingContext2D
	let children: HTMLCanvasElement[]
	beforeEach(() => {
		// tslint:disable-next-line:no-object-literal-type-assertion
		context = {} as CanvasRenderingContext2D
		subject = createContext.default
		const canvas: HTMLCanvasElement = buildMockCanvas({ context }) as HTMLCanvasElement
		spyOn(globalWrapper.document, 'createElement').and.returnValue(canvas)

		children = []
		appState.dom.canvasContainer = buildMockElement({ children }) as HTMLElement

		returnedContext = subject()

		appendedCanvas = children[ 0 ]
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

			subject()
			appendedCanvas = children[ 0 ]

			expect(appendedCanvas.style.display).toBe('none')
		})
	})
})
