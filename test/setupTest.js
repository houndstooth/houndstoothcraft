import setup from '../src/setup'
import animations from '../src/state/animations'
import iterations from '../src/state/iterations'
import consoleWrapper from '../src/consoleWrapper'

import _resetStatesForTest from './_resetStatesForTest'
beforeEach(() => _resetStatesForTest({
	state: typeof state === 'undefined' ? {} : state,
	iterations: typeof iterations === 'undefined' ? {} : iterations,
	animations: typeof animations === 'undefined' ? {} : animations,
}))

describe('setup', () => {
	it('logs the state when logging mode is on', () => {
		spyOn(consoleWrapper, 'log')

		setup({ configurationLogging: true })

		expect(consoleWrapper.log).toHaveBeenCalledWith(state)
	})

	it('does not log the state when logging mode is not on', () => {
		spyOn(consoleWrapper, 'log')

		setup()

		expect(consoleWrapper.log).not.toHaveBeenCalled()
	})

	it('sets up the canvas', () => {
		const setupCanvasSpy = jasmine.createSpy()
		setup.__Rewire__('setupCanvas', setupCanvasSpy)

		setup()

		expect(setupCanvasSpy).toHaveBeenCalled()

		setup.__ResetDependency__('setupCanvas')
	})
})