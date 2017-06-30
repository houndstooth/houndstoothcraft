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
		let propertyFunctionOneD = () => 'D'
		let propertyFunctionOneE = () => 'E'
		let propertyFunctionOneG = () => 'G'
		let propertyFunctionOneH = () => 'H'
		const effectOne = {
	        initial: {
	        	propertyA: 'A',
				propertyB: 'B'
			},
	        animations: {
				propertyD: propertyFunctionOneD,
				propertyE: propertyFunctionOneE
			},
	        iterations: {
				propertyG: propertyFunctionOneG,
				propertyH: propertyFunctionOneH
			}
	    }

		let propertyFunctionTwoD = () => 'd'
		let propertyFunctionTwoF = () => 'f'
		let propertyFunctionTwoG = () => 'g'
		let propertyFunctionTwoI = () => 'i'
		const effectTwo = {
	        initial: {
				propertyA: 'a',
				propertyC: 'c'
			},
	        animations: {
	        	propertyD: propertyFunctionTwoD,
				propertyF: propertyFunctionTwoF
			},
	        iterations: {
	        	propertyG: propertyFunctionTwoG,
				propertyI: propertyFunctionTwoI
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
			propertyD: propertyFunctionTwoD,
			propertyE: propertyFunctionOneE,
			propertyF: propertyFunctionTwoF
		}))
		expect(settings.iterations).toEqual(jasmine.objectContaining({
			propertyG: propertyFunctionTwoG,
			propertyH: propertyFunctionOneH,
			propertyI: propertyFunctionTwoI
		}))
	})
})