import { Canvas, Context, PageElement } from '../../../../../src/app/page'
import createContext from '../../../../../src/app/page/createContext'
import * as windowWrapper from '../../../../../src/utilities'
import { buildMockContext } from '../../../../helpers/buildMockContext'
import { buildMockCanvas } from '../../../helpers/buildMockCanvas'
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('create context', () => {
	let returnedContext: Context
	let appendedCanvas: Canvas
	const context: Context = buildMockContext()
	beforeEach(() => {
		const canvas: Canvas = buildMockCanvas({ context })
		spyOn(windowWrapper.documentWrapper, 'createElement').and.returnValue(canvas)

		const children: Canvas[] = []
		const canvasContainer: PageElement = buildMockElement({ children })

		returnedContext = createContext({ canvasContainer })

		appendedCanvas = children[0]
	})

	it('returns the 2d context of the new canvas', () => {
		expect(returnedContext).toBe(context)
	})

	it('sets this context\'s canvas\'s position to absolute, so they can stack', () => {
		if (appendedCanvas.style) {
			expect(appendedCanvas.style.position).toBe('absolute')
		}
		else {
			fail()
		}
	})
})
