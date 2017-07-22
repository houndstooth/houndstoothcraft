import codeUtilities from '../../../src/utilities/codeUtilities'
import setup from '../../../src/settings/setup'
import consoleWrapper from '../../../src/application/consoleWrapper'
import defaultSettings from '../../../src/settings/defaultSettings'
import settingsUtilities from '../../../src/utilities/settingsUtilities'

describe('setup', () => {
	it('logs the settings when logging mode is on', () => {
		spyOn(consoleWrapper, 'log')

		setup({ settingsLogging: true })

		expect(consoleWrapper.log).toHaveBeenCalledWith(currentState.settings)
	})

	it('does not log the settings when logging mode is not on', () => {
		spyOn(consoleWrapper, 'log')

		setup()

		expect(consoleWrapper.log).not.toHaveBeenCalled()
	})

	it('sets up settings', () => {
		spyOn(codeUtilities, 'settingIsDefinedOnSettings').and.returnValue(true)
		setup.__Rewire__('setupCanvas', () => {
		})

		// effects

		const settingFunctionOneD = () => 'D'
		const settingFunctionOneE = () => 'E'
		const settingFunctionOneG = () => 'G'
		const settingFunctionOneH = () => 'H'
		const effectOne = {
			base: {
				settingA: 'A',
				settingB: 'B',
			},
			animations: {
				settingD: settingFunctionOneD,
				settingE: settingFunctionOneE,
			},
			iterations: {
				settingG: settingFunctionOneG,
				settingH: settingFunctionOneH,
			},
		}

		const settingFunctionTwoD = () => 'd'
		const settingFunctionTwoF = () => 'f'
		const settingFunctionTwoG = () => 'g'
		const settingFunctionTwoI = () => 'i'
		const effectTwo = {
			base: {
				settingA: 'a',
				settingC: 'c',
			},
			animations: {
				settingD: settingFunctionTwoD,
				settingF: settingFunctionTwoF,
			},
			iterations: {
				settingG: settingFunctionTwoG,
				settingI: settingFunctionTwoI,
			},
		}

		const effects = [ effectOne, effectTwo ]

		// defaults

		defaultSettings.base = {
			settingA: 'pre-a',
			settingJ: 'pre-j',
		}
		const settingFunctionDefaultD = () => 'pre-d'
		const settingFunctionDefaultK = () => 'pre-k'
		defaultSettings.animations = {
			settingD: settingFunctionDefaultD,
			settingK: settingFunctionDefaultK,
		}
		const settingFunctionDefaultG = () => 'pre-g'
		const settingFunctionDefaultL = () => 'pre-l'
		defaultSettings.iterations = {
			settingG: settingFunctionDefaultG,
			settingL: settingFunctionDefaultL,
		}

		// overrides

		const settingFunctionOverridesF = () => 'fF'
		const settingFunctionOverridesN = () => 'nN'
		const settingFunctionOverridesI = () => 'iI'
		const settingFunctionOverridesP = () => 'pP'
		const overrides = {
			base: {
				settingC: 'cC',
				settingM: 'mM',
			},
			animations: {
				settingF: settingFunctionOverridesF,
				settingN: settingFunctionOverridesN,
			},
			iterations: {
				settingI: settingFunctionOverridesI,
				settingP: settingFunctionOverridesP,
			},
		}

		setup({ effects, overrides })

		expect(currentState.settings.base).toEqual(jasmine.objectContaining({
			settingA: 'a',
			settingB: 'B',
			settingC: 'cC',
			settingJ: 'pre-j',
			settingM: 'mM',
		}))
		expect(currentState.settings.animations).toEqual(jasmine.objectContaining({
			settingD: settingFunctionTwoD,
			settingE: settingFunctionOneE,
			settingF: settingFunctionOverridesF,
			settingK: settingFunctionDefaultK,
			settingN: settingFunctionOverridesN,
		}))
		expect(currentState.settings.iterations).toEqual(jasmine.objectContaining({
			settingG: settingFunctionTwoG,
			settingH: settingFunctionOneH,
			settingI: settingFunctionOverridesI,
			settingL: settingFunctionDefaultL,
			settingP: settingFunctionOverridesP,
		}))

		setup.__ResetDependency__('setupCanvas')
	})

	describe('when there are non-settings', () => {
		beforeEach(() => {
			spyOn(consoleWrapper, 'error')
			spyOn(settingsUtilities, 'applyOverrides')
		})

		describe('on an effect', () => {
			it('does not proceed to merge any settings onto the global spot', () => {
				setup({ effects: [ { yikes: {} } ] })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Attempted to add unrecognized settings to pattern: yikes')
				expect(settingsUtilities.applyOverrides).not.toHaveBeenCalled()
			})
		})

		describe('on the overrides', () => {
			it('does not proceed to merge any settings onto the global spot', () => {
				setup({ overrides: { yikes: {} } })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Attempted to add unrecognized settings to pattern: yikes')
				expect(settingsUtilities.applyOverrides).not.toHaveBeenCalled()
			})
		})

		describe('on the defaults', () => {
			it('does not proceed to merge any settings onto the global spot', () => {
				defaultSettings.yikes = {}
				setup({ base: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Attempted to add unrecognized settings to pattern: yikes')
				expect(settingsUtilities.applyOverrides).not.toHaveBeenCalled()
			})
		})

		describe('on the global current (somehow)', () => {
			it('does not proceed to merge any settings onto the global spot', () => {
				currentState.settings.yikes = {}
				setup({ base: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Attempted to add unrecognized settings to pattern: yikes')
				expect(settingsUtilities.applyOverrides).not.toHaveBeenCalled()
			})
		})
	})
})
