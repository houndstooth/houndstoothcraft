import { applyBackgroundColor, constants, setSetting, state, to } from '../../../../../src'
import Spy = jasmine.Spy

const { CYAN } = constants

describe('apply background color', () => {
	const defaultFillStyle: string = '#000000'
	let fillRectSpy: Spy
	beforeEach(() => {
		fillRectSpy = jasmine.createSpy('fillRect')
		state.contexts = [ { fillRect: fillRectSpy, fillStyle: defaultFillStyle } ]
		setSetting.main('canvasSize', to.Px(450))
	})

	it('fills the entire canvas with the color', () => {
		setSetting.main('colorSettings', { backgroundColor: CYAN })

		applyBackgroundColor.main()

		expect(state.contexts[0].fillStyle).toBe('rgba(0,255,255,1)')
		expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 450, 450)
	})

	it('returns early when no background color is set', () => {
		applyBackgroundColor.main()

		expect(state.contexts[0].fillStyle).toBe(defaultFillStyle)
		expect(fillRectSpy).not.toHaveBeenCalled()
	})
})
