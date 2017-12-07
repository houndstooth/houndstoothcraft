import { applyBackgroundColor, appState, constants, NullarySideEffector } from '../../../../../src'
import { setPatternStateForTest } from '../../../helpers'
import Spy = jasmine.Spy

const subject: NullarySideEffector = applyBackgroundColor.default

describe('apply background color', () => {
	const { CANVAS_SIZE, CYAN } = constants
	const defaultFillStyle: string = '#000000'
	let fillRectSpy: Spy
	beforeEach(() => {
		fillRectSpy = jasmine.createSpy('fillRect')
		appState.canvas.contexts = [ { fillRect: fillRectSpy, fillStyle: defaultFillStyle } ]
	})

	it('fills the entire canvas with the color', () => {
		setPatternStateForTest('colorSettings', { backgroundColor: CYAN })

		subject()

		expect(appState.canvas.contexts[ 0 ].fillStyle).toBe('rgba(0,255,255,1)')
		expect(fillRectSpy).toHaveBeenCalledWith(0, 0, CANVAS_SIZE, CANVAS_SIZE)
	})

	it('returns early when no background color is set', () => {
		subject()

		expect(appState.canvas.contexts[ 0 ].fillStyle).toBe(defaultFillStyle)
		expect(fillRectSpy).not.toHaveBeenCalled()
	})
})
