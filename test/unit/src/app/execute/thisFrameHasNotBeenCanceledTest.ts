import { appState, thisFrameHasNotBeenCanceled } from '../../../../../src/indexForTest'

describe('this frame has not been canceled', () => {
	let subject: (_: number) => boolean
	beforeEach(() => {
		subject = thisFrameHasNotBeenCanceled.default
		appState.execute.frameId = 45
	})

	it('is true if the frame is the same as the one on the app state', () => {
		expect(subject(45)).toBe(true)
	})

	it('is false if the frame is different from the one on the app state', () => {
		expect(subject(44)).toBe(false)
	})
})
