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

	it('sets up settings', () => {
	    const effectOne = {
	        initial: {
	        	propertyA: 'A',
				propertyB: 'B'
			},
	        animations: {
				propertyD: 'D',
				propertyE: 'E'
			},
	        iterations: {
				propertyG: 'G',
				propertyH: 'H'
			}
	    }
	    const effectTwo = {
	        initial: {
				propertyA: 'a',
				propertyC: 'c'
			},
	        animations: {
	        	propertyD: 'd',
				propertyF: 'f'
			},
	        iterations: {
	        	propertyG: 'g',
				propertyI: 'i'
			}
	    }
	    const effects = [ effectOne, effectTwo ]

	    setup({ effects })

	    expect(settings.initial).toEqual(jasmine.objectContaining({
			propertyA: 'a',
			propertyB: 'B',
			propertyC: 'c'
		}))
		expect(settings.animations).toEqual(jasmine.objectContaining({
			propertyD: 'd',
			propertyE: 'E',
			propertyF: 'f'
		}))
		expect(settings.iterations).toEqual(jasmine.objectContaining({
			propertyG: 'g',
			propertyH: 'H',
			propertyI: 'i'
		}))
	})
})