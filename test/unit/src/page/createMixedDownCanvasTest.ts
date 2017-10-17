import * as canvas from '../../../../src/canvas/index'
import createMixedDownCanvas from '../../../../src/page/createMixedDownCanvas'
import * as deleteElementIfExists from '../../../../src/page/deleteElementIfExists'
import * as window from '../../../../src/utilities/windowWrapper'
import buildMockContext from '../../../helpers/buildMockContext'
import buildMockCanvas from '../../helpers/buildMockCanvas'
import buildMockElement from '../../helpers/buildMockElement'

describe('create mixed down canvas', () => {
	let mixedDownCanvas
	const mixedDownContext = buildMockContext()
	const mockBodyChildren = []
	const mixedDownCanvasClassList = []
	let returnedMixedDownContext
	beforeAll(() => {
		spyOn(deleteElementIfExists, 'default')

		window.document.body = buildMockElement({ mockChildren: mockBodyChildren })

		mixedDownCanvas = buildMockCanvas({ mockContext: mixedDownContext, mockClassList: mixedDownCanvasClassList })
		spyOn(window.document, 'createElement').and.returnValue(mixedDownCanvas)

		spyOn(canvas, 'getCanvasDimensions').and.returnValue([ 400, 500 ])

		returnedMixedDownContext = createMixedDownCanvas()
	})

	it('deletes the existing mixed down canvas, if present', () => {
		expect(deleteElementIfExists.default).toHaveBeenCalledWith('.mixed-down-canvas')
	})

	it('puts the new mixed down canvas on the document body', () => {
		expect(mockBodyChildren[0]).toBe(mixedDownCanvas)
	})

	it('adds a class name to the mixed down canvas', () => {
		expect(mixedDownCanvasClassList[0]).toBe('mixed-down-canvas')
	})

	it('returns the mixed down canvas\'s context', () => {
		expect(returnedMixedDownContext).toBe(mixedDownContext)
	})

	it('does not display the mixed down canvas', () => {
		expect(mixedDownCanvas.style.display).toBe('none')
	})

	it('sets the size of the mixed down canvas', () => {
		expect(mixedDownCanvas.width).toBe(400)
		expect(mixedDownCanvas.height).toBe(500)
	})
})
