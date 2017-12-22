import { appState, thisPatternHasNotBeenCanceled } from '../../../../../../src/indexForTest'

describe('this pattern has not been canceled', () => {
	let subject: (_: number) => boolean
	beforeEach(() => {
		subject = thisPatternHasNotBeenCanceled.default
		appState.execute.patternId = 45
	})

	it('is true if the frame is the same as the one on the app state', () => {
		expect(subject(45)).toBe(true)
	})

	it('is false if the frame is different from the one on the app state', () => {
		expect(subject(44)).toBe(false)
	})
})
