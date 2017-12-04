import { clearInterval, state, windowWrapper } from '../../../../../src'

const subject: (_: string) => void = clearInterval.default

const FAKE_GRID_PROGRESS_INTERVAL: number = 3369

describe('clear interval', () => {
	beforeEach(() => {
		state.gridProgressInterval = FAKE_GRID_PROGRESS_INTERVAL
		spyOn(windowWrapper, 'clearInterval')

		subject('gridProgressInterval')
	})

	it('clears the interval from the window', () => {
		expect(windowWrapper.clearInterval).toHaveBeenCalledWith(FAKE_GRID_PROGRESS_INTERVAL)
	})

	it('sets the state node for this interval to undefined', () => {
		expect(state.gridProgressInterval).toBe(undefined)
	})
})
