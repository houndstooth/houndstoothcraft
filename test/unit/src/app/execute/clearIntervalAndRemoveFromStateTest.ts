import { appState, clearIntervalAndRemoveFromState, globalWrapper } from '../../../../../src/indexForTest'

const subject: (_: string) => void = clearIntervalAndRemoveFromState.default

describe('clear interval and remove from state', () => {
	const FAKE_GRID_PROGRESS_INTERVAL: number = 3369
	beforeEach(() => {
		appState.execute.gridProgressInterval = FAKE_GRID_PROGRESS_INTERVAL
		spyOn(globalWrapper.window, 'clearInterval')

		subject('gridProgressInterval')
	})

	it('clears the interval from the window', () => {
		expect(globalWrapper.window.clearInterval).toHaveBeenCalledWith(FAKE_GRID_PROGRESS_INTERVAL)
	})

	it('sets the appState node for this interval to undefined', () => {
		expect(appState.execute.gridProgressInterval).toBe(undefined)
	})
})
