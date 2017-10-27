import createContext from '../../../../src/page/createContext'
import { Canvas } from '../../../../src/page/types/Canvas'
import { Context } from '../../../../src/page/types/Context'
import { PageElement } from '../../../../src/page/types/PageElement'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockContext } from '../../../helpers/buildMockContext'
import { buildMockCanvas } from '../../helpers/buildMockCanvas'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create context', () => {
	let returnedContext: Context
	let appendedCanvas: Canvas
	const context: Context = buildMockContext()
	beforeEach(() => {
		const canvas: Canvas = buildMockCanvas({ context })
		spyOn(window.document, 'createElement').and.returnValue(canvas)

		const children: Canvas[] = []
		const canvasContainer: PageElement = buildMockElement({ children })

		returnedContext = createContext({ canvasContainer })

		appendedCanvas = children[0]
	})

	it('returns the 2d context of the new canvas', () => {
		expect(returnedContext).toBe(context)
	})

	it('sets this context\'s canvas\'s position to absolute', () => {
		if (appendedCanvas.style) {
			expect(appendedCanvas.style.position).toBe('absolute')
		}
		else {
			fail()
		}
	})
})
