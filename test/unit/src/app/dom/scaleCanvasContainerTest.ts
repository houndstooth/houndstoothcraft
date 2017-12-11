import {
	constants,
	globalWrapper,
	scaleCanvasContainer,
	scaleElement,
} from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'

const subject: () => HTMLElement = scaleCanvasContainer.default

describe('scale canvas container', () => {
	const { CANVAS_SIZE } = constants
	const canvasContainerClassList: string[] = []
	let bodyChildren: HTMLElement[]
	let returnedCanvasContainer: HTMLElement
	beforeEach(() => {
		bodyChildren = []

		spyOn(scaleElement, 'default')

		// tslint:disable-next-line:no-unsafe-any
		globalWrapper.document.body = buildMockElement({ children: bodyChildren }) as HTMLElement

		const canvasContainer: HTMLElement = buildMockElement({ classList: canvasContainerClassList }) as HTMLElement
		spyOn(globalWrapper.document, 'createElement').and.callFake(() => canvasContainer)

		returnedCanvasContainer = subject()
	})

	it('returns the canvas container it just put on the dom', () => {
		const canvasContainerAppendedToDocumentBody: HTMLElement = bodyChildren[ 0 ]
		expect(returnedCanvasContainer).toBe(canvasContainerAppendedToDocumentBody)
	})

	it('sets the canvas container width and height (as style, in px)', () => {
		expect(scaleElement.default).toHaveBeenCalledWith({
			dimensions: [ CANVAS_SIZE, CANVAS_SIZE ],
			element: returnedCanvasContainer,
		})
	})
})
