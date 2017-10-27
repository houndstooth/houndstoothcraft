import { createCanvasContainer } from '../../../../src/page/createCanvasContainer'
import * as scaleElement from '../../../../src/page/scaleElement'
import { PageElement } from '../../../../src/page/types/PageElement'
import { Px } from '../../../../src/page/types/Px'
import { setSetting } from '../../../../src/store/setSetting'
import * as to from '../../../../src/utilities/to'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockBody } from '../../helpers/buildMockBody'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create canvas container', () => {
	const canvasContainerClassList: string[] = []
	const canvasSize: Px = to.Px(450)
	let bodyChildren: PageElement[]
	let returnedCanvasContainer: PageElement
	beforeEach(() => {
		setSetting('canvasSize', canvasSize)
		bodyChildren = []

		spyOn(scaleElement, 'scaleElement')

		window.document.body = buildMockBody({ children: bodyChildren })

		const canvasContainer: PageElement = buildMockElement({ classList: canvasContainerClassList })
		spyOn(window.document, 'createElement').and.callFake(() => canvasContainer)

		returnedCanvasContainer = createCanvasContainer()
	})

	it('returns the canvas container it just put on the page', () => {
		const canvasContainerAppendedToDocumentBody: PageElement = bodyChildren[ 0 ]
		expect(returnedCanvasContainer).toBe(canvasContainerAppendedToDocumentBody)
	})

	it('assigns a class to the canvas', () => {
		const classAddedToCanvasContainer: string = canvasContainerClassList[ 0 ]
		expect(classAddedToCanvasContainer).toBe('canvas-container')
	})

	it('sets the canvas container width and height (as style, in px)', () => {
		expect(scaleElement.scaleElement).toHaveBeenCalledWith({
			dimensions: [ canvasSize, canvasSize ],
			element: returnedCanvasContainer,
		})
	})
})
