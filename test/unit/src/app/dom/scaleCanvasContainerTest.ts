import {
	constants,
	documentWrapper,
	PageElement,
	scaleCanvasContainer,
	scaleElement,
} from '../../../../../src'
import { buildMockBody, buildMockElement } from '../../../helpers'

const { CANVAS_SIZE } = constants

describe('scale canvas container', () => {
	const canvasContainerClassList: string[] = []
	let bodyChildren: PageElement[]
	let returnedCanvasContainer: PageElement
	beforeEach(() => {
		bodyChildren = []

		spyOn(scaleElement, 'default')

		// tslint:disable-next-line:no-unsafe-any
		documentWrapper.body = buildMockBody({ children: bodyChildren })

		const canvasContainer: PageElement = buildMockElement({ classList: canvasContainerClassList })
		spyOn(documentWrapper, 'createElement').and.callFake(() => canvasContainer)

		returnedCanvasContainer = scaleCanvasContainer.default()
	})

	it('returns the canvas container it just put on the dom', () => {
		const canvasContainerAppendedToDocumentBody: PageElement = bodyChildren[ 0 ]
		expect(returnedCanvasContainer).toBe(canvasContainerAppendedToDocumentBody)
	})

	it('sets the canvas container width and height (as style, in px)', () => {
		expect(scaleElement.default).toHaveBeenCalledWith({
			dimensions: [ CANVAS_SIZE, CANVAS_SIZE ],
			element: returnedCanvasContainer,
		})
	})
})
