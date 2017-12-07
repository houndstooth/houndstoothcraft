import { applyBackgroundColor, appState, constants, setSetting } from '../../../../../src'
import Spy = jasmine.Spy

const { CANVAS_SIZE, CYAN } = constants

describe('apply background color', () => {
	const defaultFillStyle: string = '#000000'
	let fillRectSpy: Spy
	beforeEach(() => {
		fillRectSpy = jasmine.createSpy('fillRect')
		appState.canvas.contexts = [ { fillRect: fillRectSpy, fillStyle: defaultFillStyle } ]
	})

	it('fills the entire canvas with the color', () => {
		setSetting.default('colorSettings', { backgroundColor: CYAN })

		applyBackgroundColor.default()

		expect(appState.canvas.contexts[0].fillStyle).toBe('rgba(0,255,255,1)')
		expect(fillRectSpy).toHaveBeenCalledWith(0, 0, CANVAS_SIZE, CANVAS_SIZE)
	})

	it('returns early when no background color is set', () => {
		applyBackgroundColor.default()

		expect(appState.canvas.contexts[0].fillStyle).toBe(defaultFillStyle)
		expect(fillRectSpy).not.toHaveBeenCalled()
	})
})
