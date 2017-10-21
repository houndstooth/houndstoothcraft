import createContext from '../../../../src/page/createContext'
import { Canvas } from '../../../../src/page/types/Canvas'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockContext } from '../../../helpers/buildMockContext'
import { buildMockCanvas } from '../../helpers/buildMockCanvas'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create context', () => {
	let returnedContext
	let appendedCanvas
	const mockContext = buildMockContext()
	beforeEach(() => {
		const mockCanvas = buildMockCanvas({ mockContext })
		spyOn(window.document, 'createElement').and.returnValue(mockCanvas)

		const mockChildren: Canvas[] = []
		const canvasContainer = buildMockElement({ mockChildren })

		returnedContext = createContext({ canvasContainer })

		appendedCanvas = mockChildren[0]
	})

	it('returns the 2d context of the new canvas', () => {
		expect(returnedContext).toBe(mockContext)
	})

	it('sets this context\'s canvas\'s position to absolute', () => {
		expect(appendedCanvas.style.position).toBe('absolute')
	})
})
