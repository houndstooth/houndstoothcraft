import {
	documentWrapper,
	PageElement,
	Px,
	scaleCanvasContainer,
	scaleElement,
	setSetting,
	to,
} from '../../../../../src'
import { buildMockBody, buildMockElement } from '../../../helpers'

describe('scale canvas container', () => {
	const canvasContainerClassList: string[] = []
	const canvasSize: Px = to.Px(450)
	let bodyChildren: PageElement[]
	let returnedCanvasContainer: PageElement
	beforeEach(() => {
		setSetting.default('canvasSize', canvasSize)
		bodyChildren = []

		spyOn(scaleElement, 'default')

		// tslint:disable-next-line:no-unsafe-any
		documentWrapper.body = buildMockBody({ children: bodyChildren })

		const canvasContainer: PageElement = buildMockElement({ classList: canvasContainerClassList })
		spyOn(documentWrapper, 'createElement').and.callFake(() => canvasContainer)

		returnedCanvasContainer = scaleCanvasContainer.default()
	})

	it('returns the canvas container it just put on the page', () => {
		const canvasContainerAppendedToDocumentBody: PageElement = bodyChildren[ 0 ]
		expect(returnedCanvasContainer).toBe(canvasContainerAppendedToDocumentBody)
	})

	it('sets the canvas container width and height (as style, in px)', () => {
		expect(scaleElement.default).toHaveBeenCalledWith({
			dimensions: [ canvasSize, canvasSize ],
			element: returnedCanvasContainer,
		})
	})
})
