import createCanvasContainer from '../../../../src/page/createCanvasContainer'
import * as window from '../../../../src/utilities/windowWrapper'
import * as setElementDimensions from '../../../../src/page/setElementDimensions'
import buildMockElement from '../../helpers/buildMockElement'

describe('create canvas container', () => {
	const mockCanvasContainerClassList = []
	const canvasSize = [ 400, 500 ]
	const mockBodyChildren = []
	let returnedCanvasContainer
	beforeEach(() => {
		spyOn(setElementDimensions, 'default')

		window.document.body = buildMockElement({ mockChildren: mockBodyChildren })

		const canvasContainer = buildMockElement({ mockClassList: mockCanvasContainerClassList })
		spyOn(window.document, 'createElement').and.callFake(() => canvasContainer)

		returnedCanvasContainer = createCanvasContainer({ canvasSize })
	})

	it('returns the canvas container it just put on the page', () => {
		const canvasContainerAppendedToDocumentBody = mockBodyChildren[0]
		expect(returnedCanvasContainer).toBe(canvasContainerAppendedToDocumentBody)
	})

	it('assigns a class to the canvas', () => {
		const classAddedToCanvasContainer = mockCanvasContainerClassList[0]
		expect(classAddedToCanvasContainer).toBe('canvas-container')
	})

	it('sets the canvas container width and height (as style, in px)', () => {
		expect(setElementDimensions.default).toHaveBeenCalledWith(returnedCanvasContainer, canvasSize)
	})
})
