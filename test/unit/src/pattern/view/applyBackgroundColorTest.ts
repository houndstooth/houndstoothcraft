import { setSetting } from '../../../../../src/app/store/setSetting'
import { CYAN } from '../../../../../src/constants'
import { applyBackgroundColor } from '../../../../../src/pattern/view/applyBackgroundColor'
import { state } from '../../../../../src/state'
import * as to from '../../../../../src/to'
import Spy = jasmine.Spy

describe('apply background color', () => {
	const defaultFillStyle: string = '#000000'
	let fillRectSpy: Spy
	beforeEach(() => {
		fillRectSpy = jasmine.createSpy('fillRect')
		state.contexts = [ { fillRect: fillRectSpy, fillStyle: defaultFillStyle } ]
		setSetting('canvasSize', to.Px(450))
	})

	it('fills the entire canvas with the color', () => {
		setSetting('colorSettings', { backgroundColor: CYAN })

		applyBackgroundColor()

		expect(state.contexts[0].fillStyle).toBe('rgba(0,255,255,1)')
		expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 450, 450)
	})

	it('returns early when no background color is set', () => {
		applyBackgroundColor()

		expect(state.contexts[0].fillStyle).toBe(defaultFillStyle)
		expect(fillRectSpy).not.toHaveBeenCalled()
	})
})
