import {
	Canvas,
	Context,
	createMixedDownContext,
	deleteElementIfExists,
	documentWrapper,
	PageElement,
	setSetting,
	to,
} from '../../../../../src'
import { buildMockContext } from '../../../../helpers'
import { buildMockBody, buildMockCanvas } from '../../../helpers'

describe('create mixed down context', () => {
	let mixedDownCanvas: Canvas
	const mixedDownContext: Context = buildMockContext()
	const bodyChildren: PageElement[] = []
	const mixedDownCanvasClassList: string[] = []
	let returnedMixedDownContext: Context
	beforeAll(() => {
		spyOn(deleteElementIfExists, 'default')

		// tslint:disable-next-line:no-unsafe-any
		documentWrapper.body = buildMockBody({ children: bodyChildren })

		mixedDownCanvas = buildMockCanvas({ context: mixedDownContext, classList: mixedDownCanvasClassList })
		spyOn(documentWrapper, 'createElement').and.returnValue(mixedDownCanvas)

		setSetting.default('canvasSize', to.Px(450))

		returnedMixedDownContext = createMixedDownContext.default()
	})

	it('deletes the existing mixed down canvas, if present', () => {
		expect(deleteElementIfExists.default).toHaveBeenCalledWith('.mixed-down-canvas')
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
