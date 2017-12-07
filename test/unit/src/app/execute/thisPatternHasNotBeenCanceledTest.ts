import { appState, thisPatternHasNotBeenCanceled } from '../../../../../src'

const subject: (_: number) => boolean = thisPatternHasNotBeenCanceled.default

describe('this pattern has not been canceled', () => {
	beforeEach(() => {
		appState.execute.patternRef = 45
	})

	it('is true if the pattern is the same as the one on the app state', () => {
		expect(subject(45)).toBe(true)
	})

	it('is false if the pattern is different from the one on the app state', () => {
		expect(subject(44)).toBe(false)
	})
})
