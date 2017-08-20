import applyBackgroundColor from '../../../src/render/applyBackgroundColor'
import { CYAN } from '../../../src/constants'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import setupCanvases from '../../../src/application/setupCanvases'
import setupContexts from '../../../src/application/setupContexts'

describe('apply background color', () => {
	const defaultFillStyle = '#000000'
	beforeEach(() => {
		resetStore(store)
		setupCanvases()
		setupContexts()
		spyOn(store.contexts[0], 'fillRect')
	})

	it('fills the entire canvas with the color', () => {
		store.mainHoundstooth.basePattern.colorSettings = { backgroundColor: [ CYAN ] }

		applyBackgroundColor()

		expect(store.contexts[0].fillStyle).toBe('#00ffff')
		expect(store.contexts[0].fillRect).toHaveBeenCalledWith(0, 0, 800, 800)
	})

	it('returns early when no background color is set', () => {
		applyBackgroundColor()

		expect(store.contexts[0].fillStyle).toBe(defaultFillStyle)
		expect(store.contexts[0].fillRect).not.toHaveBeenCalled()
	})
})
