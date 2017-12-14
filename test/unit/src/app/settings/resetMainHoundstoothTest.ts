import { appState, composeMainHoundstooth, resetMainHoundstooth } from '../../../../../src/indexForTest'

describe('reset main houndstooth', () => {
	it('returns the main houndstooth to its default state', () => {
		const subject: () => void = resetMainHoundstooth.default
		appState.settings.overrides = {
			basePattern: { colorSettings: { opacity: 0 } },
		}
		composeMainHoundstooth.default()
		// tslint:disable-next-line:max-line-length
		expect(appState.settings.mainHoundstooth.basePattern.colorSettings && appState.settings.mainHoundstooth.basePattern.colorSettings.opacity).toBe(0)

		subject()

		// tslint:disable-next-line:max-line-length
		expect(appState.settings.mainHoundstooth.basePattern.colorSettings && appState.settings.mainHoundstooth.basePattern.colorSettings.opacity).toBe(1)
	})
})
