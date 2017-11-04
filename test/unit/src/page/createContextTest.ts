import { Canvas, Context, PageElement } from '../../../../src/page'
import createContext from '../../../../src/page/createContext'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockContext } from '../../../helpers/buildMockContext'
import { buildMockCanvas } from '../../helpers/buildMockCanvas'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create context', () => {
	let returnedContext: Context
	const context: Context = buildMockContext()
	beforeEach(() => {
		const canvas: Canvas = buildMockCanvas({ context })
		spyOn(window.document, 'createElement').and.returnValue(canvas)

		const children: Canvas[] = []
		const canvasContainer: PageElement = buildMockElement({ children })

		returnedContext = createContext({ canvasContainer })
	})

	it('returns the 2d context of the new canvas', () => {
		expect(returnedContext).toBe(context)
	})
})
