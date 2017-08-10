import '../../../src/interface/setupControls'
import store from '../../../store'
import composeMainHoundstooth from '../../../src/store/composeMainHoundstooth'

describe('controls', () => {
	it('toggles settings from the effect', () => {
		composeMainHoundstooth()

		expect(store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(50)
		document.querySelector('input.houndsmorphosis').click()
		expect(store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(0)
		document.querySelector('input.houndsmorphosis').click()
		expect(store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(50)
	})
})
