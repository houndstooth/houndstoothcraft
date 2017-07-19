import codeUtilities from '../../../src/utilities/codeUtilities'
import setup from '../../../src/settings/setup'
import consoleWrapper from '../../../src/application/consoleWrapper'
import defaultSettings from '../../../src/settings/defaultSettings'
import settingsUtilities from '../../../src/utilities/settingsUtilities'

describe('setup', () => {
	it('logs the settings when logging mode is on', () => {
		spyOn(consoleWrapper, 'log')

		setup({ settingsLogging: true })

		expect(consoleWrapper.log).toHaveBeenCalledWith(current.settings)
	})

	it('does not log the settings when logging mode is not on', () => {
		spyOn(consoleWrapper, 'log')

		setup()

		expect(consoleWrapper.log).not.toHaveBeenCalled()
	})

	it('sets up settings', () => {
		spyOn(codeUtilities, 'propertyIsDefinedOnObject').and.returnValue(true)
		setup.__Rewire__('setupCanvas', () => {
		})

		// effects

		const propertyFunctionOneD = () => 'D'
		const propertyFunctionOneE = () => 'E'
		const propertyFunctionOneG = () => 'G'
		const propertyFunctionOneH = () => 'H'
		const effectOne = {
			initial: {
				propertyA: 'A',
				propertyB: 'B',
			},
			animations: {
				propertyD: propertyFunctionOneD,
				propertyE: propertyFunctionOneE,
			},
			iterations: {
				propertyG: propertyFunctionOneG,
				propertyH: propertyFunctionOneH,
			},
		}

		const propertyFunctionTwoD = () => 'd'
		const propertyFunctionTwoF = () => 'f'
		const propertyFunctionTwoG = () => 'g'
		const propertyFunctionTwoI = () => 'i'
		const effectTwo = {
			initial: {
				propertyA: 'a',
				propertyC: 'c',
			},
			animations: {
				propertyD: propertyFunctionTwoD,
				propertyF: propertyFunctionTwoF,
			},
			iterations: {
				propertyG: propertyFunctionTwoG,
				propertyI: propertyFunctionTwoI,
			},
		}

		const effects = [ effectOne, effectTwo ]

		// defaults

		defaultSettings.initial = {
			propertyA: 'pre-a',
			propertyJ: 'pre-j',
		}
		const propertyFunctionDefaultD = () => 'pre-d'
		const propertyFunctionDefaultK = () => 'pre-k'
		defaultSettings.animations = {
			propertyD: propertyFunctionDefaultD,
			propertyK: propertyFunctionDefaultK,
		}
		const propertyFunctionDefaultG = () => 'pre-g'
		const propertyFunctionDefaultL = () => 'pre-l'
		defaultSettings.iterations = {
			propertyG: propertyFunctionDefaultG,
			propertyL: propertyFunctionDefaultL,
		}

		// overrides

		const propertyFunctionOverridesF = () => 'fF'
		const propertyFunctionOverridesN = () => 'nN'
		const propertyFunctionOverridesI = () => 'iI'
		const propertyFunctionOverridesP = () => 'pP'
		const overrides = {
			initial: {
				propertyC: 'cC',
				propertyM: 'mM',
			},
			animations: {
				propertyF: propertyFunctionOverridesF,
				propertyN: propertyFunctionOverridesN,
			},
			iterations: {
				propertyI: propertyFunctionOverridesI,
				propertyP: propertyFunctionOverridesP,
			},
		}

		setup({ effects, overrides })

		expect(current.settings.initial).toEqual(jasmine.objectContaining({
			propertyA: 'a',
			propertyB: 'B',
			propertyC: 'cC',
			propertyJ: 'pre-j',
			propertyM: 'mM',
		}))
		expect(current.settings.animations).toEqual(jasmine.objectContaining({
			propertyD: propertyFunctionTwoD,
			propertyE: propertyFunctionOneE,
			propertyF: propertyFunctionOverridesF,
			propertyK: propertyFunctionDefaultK,
			propertyN: propertyFunctionOverridesN,
		}))
		expect(current.settings.iterations).toEqual(jasmine.objectContaining({
			propertyG: propertyFunctionTwoG,
			propertyH: propertyFunctionOneH,
			propertyI: propertyFunctionOverridesI,
			propertyL: propertyFunctionDefaultL,
			propertyP: propertyFunctionOverridesP,
		}))

		setup.__ResetDependency__('setupCanvas')
	})

	describe('when there are non-settings objects', () => {
		beforeEach(() => {
			spyOn(consoleWrapper, 'error')
			spyOn(settingsUtilities, 'applyOverrides')
		})

		describe('on an effect', () => {
			it('does not proceed to merge any settings onto the global spot', () => {
				setup({ effects: [ { yikes: {} } ] })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Unknown settings object: yikes')
				expect(settingsUtilities.applyOverrides).not.toHaveBeenCalled()
			})
		})

		describe('on the overrides', () => {
			it('does not proceed to merge any settings onto the global spot', () => {
				setup({ overrides: { yikes: {} } })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Unknown settings object: yikes')
				expect(settingsUtilities.applyOverrides).not.toHaveBeenCalled()
			})
		})

		describe('on the defaults', () => {
			it('does not proceed to merge any settings onto the global spot', () => {
				defaultSettings.yikes = {}
				setup({ initial: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Unknown settings object: yikes')
				expect(settingsUtilities.applyOverrides).not.toHaveBeenCalled()
			})
		})

		describe('on the global current (somehow)', () => {
			it('does not proceed to merge any settings onto the global spot', () => {
				current.settings.yikes = {}
				setup({ initial: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Unknown settings object: yikes')
				expect(settingsUtilities.applyOverrides).not.toHaveBeenCalled()
			})
		})
	})
})
