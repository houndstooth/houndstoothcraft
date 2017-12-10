import { clearContext, constants } from '../../../../../src'
import Spy = jasmine.Spy
import { buildMockContext } from '../../../helpers'

const subject: (_: CanvasRenderingContext2D) => void = clearContext.default

describe('clear context', () => {
	const { CANVAS_SIZE } = constants

	it('clears a rectangular area which is the exact size of the canvas', () => {
		const clearRectSpy: Spy = jasmine.createSpy('clearRect')
		const context: CanvasRenderingContext2D = buildMockContext({ clearRectSpy }) as CanvasRenderingContext2D

		subject(context)

		expect(clearRectSpy).toHaveBeenCalledWith(0, 0, CANVAS_SIZE, CANVAS_SIZE)
	})
})
