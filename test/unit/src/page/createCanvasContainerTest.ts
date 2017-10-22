import { createCanvasContainer } from '../../../../src/page/createCanvasContainer'
import * as scaleElement from '../../../../src/page/scaleElement'
import { getFromBaseOrDefaultPattern } from '../../../../src/store/getFromBaseOrDefaultPattern'
import { ViewSettings } from '../../../../src/store/types/settings/ViewSettings'
import * as to from '../../../../src/utilities/to'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockBody } from '../../helpers/buildMockBody'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create canvas container', () => {
	const mockCanvasContainerClassList = []
	const canvasSize = to.Dimension(450)
	let mockBodyChildren
	let returnedCanvasContainer
	beforeEach(() => {
		const viewSettings: ViewSettings = getFromBaseOrDefaultPattern('view')
		viewSettings.canvasSize = canvasSize
		mockBodyChildren = []

		spyOn(scaleElement, 'scaleElement')

		window.document.body = buildMockBody({ mockChildren: mockBodyChildren })

		const canvasContainer = buildMockElement({ mockClassList: mockCanvasContainerClassList })
		spyOn(window.document, 'createElement').and.callFake(() => canvasContainer)

		returnedCanvasContainer = createCanvasContainer()
	})

	it('returns the canvas container it just put on the page', () => {
		const canvasContainerAppendedToDocumentBody = mockBodyChildren[ 0 ]
		expect(returnedCanvasContainer).toBe(canvasContainerAppendedToDocumentBody)
	})

	it('assigns a class to the canvas', () => {
		const classAddedToCanvasContainer = mockCanvasContainerClassList[ 0 ]
		expect(classAddedToCanvasContainer).toBe('canvas-container')
	})

	it('sets the canvas container width and height (as style, in px)', () => {
		expect(scaleElement.scaleElement).toHaveBeenCalledWith({
			dimensions: [ canvasSize, canvasSize ],
			element: returnedCanvasContainer,
		})
	})
})
