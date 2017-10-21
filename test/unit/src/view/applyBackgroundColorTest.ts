import { CYAN } from '../../../../src/constants'
import { state } from '../../../../src/state'
import { getSetting } from '../../../../src/store/getSetting'
import { ViewSettings } from '../../../../src/store/types/settings/ViewSettings'
import * as to from '../../../../src/to'
import { applyBackgroundColor } from '../../../../src/view/applyBackgroundColor'

describe('apply background color', () => {
	const defaultFillStyle = '#000000'
	let fillRectSpy
	beforeEach(() => {
		fillRectSpy = jasmine.createSpy('fillRect')
		state.contexts = [ { fillRect: fillRectSpy, fillStyle: defaultFillStyle } ]
		const viewSettings: ViewSettings = getSetting('view')
		viewSettings.canvasSize = to.Dimension(450)
	})

	it('fills the entire canvas with the color', () => {
		state.mainHoundstooth.basePattern.colorSettings = { backgroundColor: CYAN }

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
