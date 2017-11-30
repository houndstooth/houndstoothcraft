import {
	Canvas,
	Context,
	createMixedDownContext,
	documentWrapper,
	PageElement,
	setSetting,
	to,
} from '../../../../../src'
import { buildMockContext } from '../../../../helpers'
import { buildMockCanvas, buildMockElement } from '../../../helpers'

describe('create mixed down context', () => {
	let mixedDownCanvas: Canvas
	const mixedDownContext: Context = buildMockContext()
	let canvasContainer: PageElement
	const canvasContainerChildren: PageElement[] = []
	const mixedDownCanvasClassList: string[] = []
	let returnedMixedDownContext: Context
	beforeAll(() => {
		// tslint:disable-next-line:no-unsafe-any
		canvasContainer = buildMockElement({ children: canvasContainerChildren })
		spyOn(documentWrapper, 'querySelector').and.returnValue(canvasContainer)

		mixedDownCanvas = buildMockCanvas({ context: mixedDownContext, classList: mixedDownCanvasClassList })
		spyOn(documentWrapper, 'createElement').and.returnValue(mixedDownCanvas)

		setSetting.default('canvasSize', to.Px(450))

		returnedMixedDownContext = createMixedDownContext.default()
	})

	it('puts the new mixed down canvas in the canvas container', () => {
		expect(canvasContainerChildren[ 0 ]).toBe(mixedDownCanvas)
	})

	it('adds a class name to the mixed down canvas', () => {
		expect(mixedDownCanvasClassList[ 0 ]).toBe('mixed-down-canvas')
	})

	it('returns the mixed down canvas\'s context', () => {
		expect(returnedMixedDownContext).toBe(mixedDownContext)
	})

	it('sets the size of the mixed down canvas', () => {
		expect(mixedDownCanvas.width).toBe(450)
		expect(mixedDownCanvas.height).toBe(450)
	})
})
