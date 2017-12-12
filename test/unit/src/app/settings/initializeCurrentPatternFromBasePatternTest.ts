import {
	appState,
	composeMainHoundstooth,
	Effect,
	initializeCurrentPatternFromBasePattern,
	NullarySideEffector,
} from '../../../../../src/indexForTest'


describe('initialize current pattern from base pattern', () => {
	it('makes the current pattern into a copy of the just-composed main houndstooth\'s base pattern', () => {
		const subject: NullarySideEffector = initializeCurrentPatternFromBasePattern.default
		const overrides: Effect = { basePattern: { viewSettings: { zoom: 784 } } }
		composeMainHoundstooth.default({ overrides })

		subject()

		// tslint:disable-next-line:no-unsafe-any
		expect(appState.settings.currentPattern.viewSettings.zoom).toBe(784)
	})
})
