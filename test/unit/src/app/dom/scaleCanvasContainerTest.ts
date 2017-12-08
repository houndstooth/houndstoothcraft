import {
	constants,
	documentWrapper,
	HTMLElement,
	scaleCanvasContainer,
	scaleElement,
} from '../../../../../src'
import { buildMockBody, buildMockElement } from '../../../helpers'

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
		documentWrapper.body = buildMockBody({ children: bodyChildren })

		const canvasContainer: HTMLElement = buildMockElement({ classList: canvasContainerClassList })
		spyOn(documentWrapper, 'createElement').and.callFake(() => canvasContainer)

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
