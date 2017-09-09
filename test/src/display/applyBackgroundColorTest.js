import applyBackgroundColor from '../../../src/display/applyBackgroundColor'
import { CYAN } from '../../../src/constants'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'

describe('apply background color', () => {
	const defaultFillStyle = '#000000'
	let fillRectSpy
	beforeEach(() => {
		resetStore(store)
		fillRectSpy = jasmine.createSpy()
		store.contexts = [ { fillRect: fillRectSpy, fillStyle: defaultFillStyle } ]
		applyBackgroundColor.__Rewire__('getCanvasSize', () => [ 400, 500 ])
	})

	it('fills the entire canvas with the color', () => {
		store.mainHoundstooth.basePattern.colorSettings = { backgroundColor: CYAN }

		applyBackgroundColor()

		expect(store.contexts[0].fillStyle).toBe('rgba(0,255,255,1)')
		expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 400, 500)
	})

	it('returns early when no background color is set', () => {
		applyBackgroundColor()

		expect(store.contexts[0].fillStyle).toBe(defaultFillStyle)
		expect(fillRectSpy).not.toHaveBeenCalled()
	})
})
