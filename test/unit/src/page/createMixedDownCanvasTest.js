import createMixedDownCanvas from '../../../../src/page/createMixedDownCanvas'
import state from '../../../../src/state'
import * as canvas from '../../../../src/canvas/index'
import buildMockCanvas from '../../helpers/buildMockCanvas'
import buildMockElement from '../../helpers/buildMockElement'
import * as deleteElementIfExists from '../../../../src/page/deleteElementIfExists'
import * as window from '../../../../src/utilities/windowWrapper'

describe('create mixed down canvas', () => {
	let mixedDownCanvas
	const mixedDownContext = {}
	const mockBodyChildren = []
	const mixedDownCanvasClassList = []
	beforeAll(() => {
		spyOn(deleteElementIfExists, 'default')

		window.document.body = buildMockElement({ mockChildren: mockBodyChildren })

		mixedDownCanvas = buildMockCanvas({ mockContext: mixedDownContext, mockClassList: mixedDownCanvasClassList })
		spyOn(window.document, 'createElement').and.returnValue(mixedDownCanvas)

		spyOn(canvas, 'getCanvasSize').and.returnValue([ 400, 500 ])

		createMixedDownCanvas()
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

	it('points the mixed down context node of the state at the new mixed down canvas\'s context', () => {
		expect(state.mixedDownContext).toBe(mixedDownContext)
	})

	it('does not display the mixed down canvas', () => {
		expect(mixedDownCanvas.style.display).toBe('none')
	})

	it('sets the size of the mixed down canvas', () => {
		expect(mixedDownCanvas.width).toBe(400)
		expect(mixedDownCanvas.height).toBe(500)
	})
})
