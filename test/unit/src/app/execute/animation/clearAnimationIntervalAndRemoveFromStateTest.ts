import { appState, clearAnimationIntervalAndRemoveFromState, globalWrapper } from '../../../../../../src/indexForTest'

describe('clear animation interval and remove from state', () => {
	let subject: () => void
	const FAKE_ANIMATION_INTERVAL: number = 3369
	beforeEach(() => {
		subject = clearAnimationIntervalAndRemoveFromState.default
		appState.execute.animationInterval = FAKE_ANIMATION_INTERVAL
		spyOn(globalWrapper.window, 'clearInterval')

		subject()
	})

	it('clears the interval from the window', () => {
		expect(globalWrapper.window.clearInterval).toHaveBeenCalledWith(FAKE_ANIMATION_INTERVAL)
	})

	it('sets the appState node for this interval to undefined', () => {
		expect(appState.execute.animationInterval).toBe(undefined)
	})

	it('when the animation interval is not defined, no biggie', () => {
		appState.execute.animationInterval = undefined
		subject()
	})
})
