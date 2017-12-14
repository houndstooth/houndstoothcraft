import {
	appState,
	composeMainHoundstooth,
	initializeCurrentPatternFromBasePattern,
} from '../../../../../src/indexForTest'

describe('initialize current pattern from base pattern', () => {
	it('makes the current pattern into a copy of the just-composed main houndstooth\'s base pattern', () => {
		const subject: () => void = initializeCurrentPatternFromBasePattern.default
		appState.settings.overrides = { basePattern: { viewSettings: { zoom: 784 } } }
		composeMainHoundstooth.default()

		subject()

		// tslint:disable-next-line:no-unsafe-any
		expect(appState.settings.currentPattern.viewSettings.zoom).toBe(784)
	})
})
