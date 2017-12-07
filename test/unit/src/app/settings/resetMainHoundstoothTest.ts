import { appState, composeMainHoundstooth, Effect, NullarySideEffector, resetMainHoundstooth } from '../../../../../src'

const subject: NullarySideEffector = resetMainHoundstooth.default

describe('reset main houndstooth', () => {
	it('returns the main houndstooth to its default state', () => {
		const overrides: Effect = {
			basePattern: { colorSettings: { opacity: 0 } },
		}
		composeMainHoundstooth.default({ overrides })
		// tslint:disable-next-line:max-line-length
		expect(appState.settings.mainHoundstooth.basePattern.colorSettings && appState.settings.mainHoundstooth.basePattern.colorSettings.opacity).toBe(0)

		subject()

		// tslint:disable-next-line:max-line-length
		expect(appState.settings.mainHoundstooth.basePattern.colorSettings && appState.settings.mainHoundstooth.basePattern.colorSettings.opacity).toBe(1)
	})
})
