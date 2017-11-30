import { clearContext, Context, Px, to } from '../../../../../src'
import Spy = jasmine.Spy

const subject: (_: { canvasSize: Px, context: Context }) => void = clearContext.default

describe('clear context', () => {
	it('clears a rectangular area which is the exact size of the canvas', () => {
		const clearRectSpy: Spy = jasmine.createSpy('clearRect')

		subject({ canvasSize: to.Px(450), context: { clearRect: clearRectSpy } })

		expect(clearRectSpy).toHaveBeenCalledWith(0, 0, 450, 450)
	})
})
