import setup from '../src/setup'
import consoleWrapper from '../src/consoleWrapper'

describe('setup', () => {
	it('logs the settings when logging mode is on', () => {
		spyOn(consoleWrapper, 'log')

		setup({ configurationLogging: true })

		expect(consoleWrapper.log).toHaveBeenCalledWith(settings)
	})

	it('does not log the settings when logging mode is not on', () => {
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