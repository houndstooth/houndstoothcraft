import { clearContext, constants, Context } from '../../../../../src'
import Spy = jasmine.Spy

const subject: (_: Context) => void = clearContext.default

describe('clear context', () => {
	const { CANVAS_SIZE } = constants

	it('clears a rectangular area which is the exact size of the canvas', () => {
		const clearRectSpy: Spy = jasmine.createSpy('clearRect')

		subject({ clearRect: clearRectSpy })

		expect(clearRectSpy).toHaveBeenCalledWith(0, 0, CANVAS_SIZE, CANVAS_SIZE)
	})
})
