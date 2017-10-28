import { Canvas, Context, PageElement } from '../../../../src/page'
import createMixedDownContext from '../../../../src/page/createMixedDownContext'
import * as deleteElementIfExists from '../../../../src/page/deleteElementIfExists'
import { setSetting } from '../../../../src/store/setSetting'
import * as to from '../../../../src/utilities/to'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockContext } from '../../../helpers/buildMockContext'
import { buildMockBody } from '../../helpers/buildMockBody'
import { buildMockCanvas } from '../../helpers/buildMockCanvas'

describe('create mixed down canvas', () => {
	let mixedDownCanvas: Canvas
	const mixedDownContext: Context = buildMockContext()
	const bodyChildren: PageElement[] = []
	const mixedDownCanvasClassList: string[] = []
	let returnedMixedDownContext: Context
	beforeAll(() => {
		spyOn(deleteElementIfExists, 'deleteElementIfExists')

		window.document.body = buildMockBody({ children: bodyChildren })

		mixedDownCanvas = buildMockCanvas({ context: mixedDownContext, classList: mixedDownCanvasClassList })
		spyOn(window.document, 'createElement').and.returnValue(mixedDownCanvas)

		setSetting('canvasSize', to.Px(450))

		returnedMixedDownContext = createMixedDownContext()
	})

	it('deletes the existing mixed down canvas, if present', () => {
		expect(deleteElementIfExists.deleteElementIfExists).toHaveBeenCalledWith('.mixed-down-canvas')
	})

	it('puts the new mixed down canvas on the document body', () => {
		expect(bodyChildren[ 0 ]).toBe(mixedDownCanvas)
	})

	it('adds a class name to the mixed down canvas', () => {
		expect(mixedDownCanvasClassList[ 0 ]).toBe('mixed-down-canvas')
	})

	it('returns the mixed down canvas\'s context', () => {
		expect(returnedMixedDownContext).toBe(mixedDownContext)
	})

	it('does not display the mixed down canvas', () => {
		if (mixedDownCanvas.style) {
			expect(mixedDownCanvas.style.display).toBe('none')
		}
		else {
			fail()
		}
	})

	it('sets the size of the mixed down canvas', () => {
		expect(mixedDownCanvas.width).toBe(450)
		expect(mixedDownCanvas.height).toBe(450)
	})
})
