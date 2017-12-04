import { applyBackgroundColor, constants, setSetting, state, to } from '../../../../../src'
import Spy = jasmine.Spy

const { CYAN } = constants

describe('apply background color', () => {
	const defaultFillStyle: string = '#000000'
	let fillRectSpy: Spy
	beforeEach(() => {
		fillRectSpy = jasmine.createSpy('fillRect')
		state.canvas.contexts = [ { fillRect: fillRectSpy, fillStyle: defaultFillStyle } ]
		setSetting.default('canvasSize', to.Px(450))
	})

	it('fills the entire canvas with the color', () => {
		setSetting.default('colorSettings', { backgroundColor: CYAN })

		applyBackgroundColor.default()

		expect(state.canvas.contexts[0].fillStyle).toBe('rgba(0,255,255,1)')
		expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 450, 450)
	})

	it('returns early when no background color is set', () => {
		applyBackgroundColor.default()

		expect(state.canvas.contexts[0].fillStyle).toBe(defaultFillStyle)
		expect(fillRectSpy).not.toHaveBeenCalled()
	})
})
