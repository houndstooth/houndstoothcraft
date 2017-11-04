import { PageElement, Px } from '../../../../src/page'
import { scaleCanvasContainer } from '../../../../src/page/scaleCanvasContainer'
import * as scaleElement from '../../../../src/page/scaleElement'
import { setSetting } from '../../../../src/store/setSetting'
import * as to from '../../../../src/utilities/to'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockBody } from '../../helpers/buildMockBody'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('scale canvas container', () => {
	const canvasContainerClassList: string[] = []
	const canvasSize: Px = to.Px(450)
	let bodyChildren: PageElement[]
	let returnedCanvasContainer: PageElement
	beforeEach(() => {
		setSetting('canvasSize', canvasSize)
		bodyChildren = []

		spyOn(scaleElement, 'scaleElement')

		// tslint:disable-next-line:no-unsafe-any
		window.document.body = buildMockBody({ children: bodyChildren })

		const canvasContainer: PageElement = buildMockElement({ classList: canvasContainerClassList })
		spyOn(window.document, 'createElement').and.callFake(() => canvasContainer)

		returnedCanvasContainer = scaleCanvasContainer()
	})

	it('returns the canvas container it just put on the page', () => {
		const canvasContainerAppendedToDocumentBody: PageElement = bodyChildren[ 0 ]
		expect(returnedCanvasContainer).toBe(canvasContainerAppendedToDocumentBody)
	})

	it('sets the canvas container width and height (as style, in px)', () => {
		expect(scaleElement.scaleElement).toHaveBeenCalledWith({
			dimensions: [ canvasSize, canvasSize ],
			element: returnedCanvasContainer,
		})
	})
})
