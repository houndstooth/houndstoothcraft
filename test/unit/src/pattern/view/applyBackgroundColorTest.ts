import {
	applyBackgroundColor,
	CANVAS_SIZE,
	CYAN,
	getCurrentContext,
	patternState,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy
import { buildMockContext } from '../../../helpers'

describe('apply background color', () => {
	let subject: () => void
	const defaultFillStyle: string = '#000000'
	let fillRectSpy: Spy
	let context: CanvasRenderingContext2D
	beforeEach(() => {
		subject = applyBackgroundColor.default
		fillRectSpy = jasmine.createSpy('fillRect')
		context = buildMockContext({ fillRectSpy }) as CanvasRenderingContext2D
		spyOn(getCurrentContext, 'default').and.returnValue(context)
	})

	it('fills the entire canvas with the color', () => {
		patternState.colorSettings.backgroundColor = CYAN

		subject()

		expect(context.fillStyle).toBe('rgba(0,255,255,1)')
		expect(fillRectSpy).toHaveBeenCalledWith(0, 0, CANVAS_SIZE, CANVAS_SIZE)
	})

	it('returns early when no background color is set', () => {
		subject()

		expect(context.fillStyle).toBe(defaultFillStyle)
		expect(fillRectSpy).not.toHaveBeenCalled()
	})
})
