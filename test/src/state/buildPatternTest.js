import codeUtilities from '../../../src/utilities/codeUtilities'
import buildPattern from '../../../src/state/buildPattern'
import consoleWrapper from '../../../src/application/consoleWrapper'
import patternDefaults from '../../../src/state/patternDefaults'
import stateUtilities from '../../../src/utilities/stateUtilities'
import store from '../../../store'
import initialState from '../../../src/state/initialState'

describe('buildPattern', () => {
	beforeEach(() => {
		store.currentState = codeUtilities.deepClone(initialState)
	})

	it('logs the pattern when logging mode is on', () => {
		spyOn(consoleWrapper, 'log')

		buildPattern({ logPattern: true })

		expect(consoleWrapper.log).toHaveBeenCalledWith(store.currentState.builtPattern)
	})

	it('does not log the pattern when logging mode is not on', () => {
		spyOn(consoleWrapper, 'log')

		buildPattern()

		expect(consoleWrapper.log).not.toHaveBeenCalled()
	})

	it('builds the pattern with settings out of pattern defaults, pattern effects, and pattern overrides', () => {
		spyOn(codeUtilities, 'settingIsDefinedOnSettings').and.returnValue(true)
		buildPattern.__Rewire__('setupCanvas', () => {
		})

		// effects

		const settingFunctionOneD = () => 'D'
		const settingFunctionOneE = () => 'E'
		const settingFunctionOneG = () => 'G'
		const settingFunctionOneH = () => 'H'
		const patternEffectOne = {
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
		const patternEffectTwo = {
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

		const patternEffects = [ patternEffectOne, patternEffectTwo ]

		// defaults

		patternDefaults.base = {
			settingA: 'pre-a',
			settingJ: 'pre-j',
		}
		const settingFunctionDefaultD = () => 'pre-d'
		const settingFunctionDefaultK = () => 'pre-k'
		patternDefaults.animations = {
			settingD: settingFunctionDefaultD,
			settingK: settingFunctionDefaultK,
		}
		const settingFunctionDefaultG = () => 'pre-g'
		const settingFunctionDefaultL = () => 'pre-l'
		patternDefaults.iterations = {
			settingG: settingFunctionDefaultG,
			settingL: settingFunctionDefaultL,
		}

		// overrides

		const settingFunctionOverridesF = () => 'fF'
		const settingFunctionOverridesN = () => 'nN'
		const settingFunctionOverridesI = () => 'iI'
		const settingFunctionOverridesP = () => 'pP'
		const patternOverrides = {
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

		buildPattern({ patternEffects, patternOverrides })

		expect(store.currentState.builtPattern.base).toEqual(jasmine.objectContaining({
			settingA: 'a',
			settingB: 'B',
			settingC: 'cC',
			settingJ: 'pre-j',
			settingM: 'mM',
		}))
		expect(store.currentState.builtPattern.animations).toEqual(jasmine.objectContaining({
			settingD: settingFunctionTwoD,
			settingE: settingFunctionOneE,
			settingF: settingFunctionOverridesF,
			settingK: settingFunctionDefaultK,
			settingN: settingFunctionOverridesN,
		}))
		expect(store.currentState.builtPattern.iterations).toEqual(jasmine.objectContaining({
			settingG: settingFunctionTwoG,
			settingH: settingFunctionOneH,
			settingI: settingFunctionOverridesI,
			settingL: settingFunctionDefaultL,
			settingP: settingFunctionOverridesP,
		}))

		buildPattern.__ResetDependency__('setupCanvas')
	})

	describe('when there are non-settings', () => {
		beforeEach(() => {
			spyOn(consoleWrapper, 'error')
			spyOn(stateUtilities, 'mergeSettings')
		})

		describe('on an effect', () => {
			it('does not proceed to merge any settings', () => {
				buildPattern({ patternEffects: [ { yikes: {} } ] })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Attempted to add unrecognized settings to pattern: yikes')
				expect(stateUtilities.mergeSettings).not.toHaveBeenCalled()
			})
		})

		describe('on the overrides', () => {
			it('does not proceed to merge any settings', () => {
				buildPattern({ patternOverrides: { yikes: {} } })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Attempted to add unrecognized settings to pattern: yikes')
				expect(stateUtilities.mergeSettings).not.toHaveBeenCalled()
			})
		})

		describe('on the pattern defaults', () => {
			it('does not proceed to merge any settings', () => {
				patternDefaults.yikes = {}
				buildPattern({ base: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Attempted to add unrecognized settings to pattern: yikes')
				expect(stateUtilities.mergeSettings).not.toHaveBeenCalled()
			})
		})

		describe('already on the built pattern (somehow)', () => {
			it('does not proceed to merge any settings', () => {
				store.currentState.builtPattern.yikes = {}
				buildPattern({ base: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('Attempted to add unrecognized settings to pattern: yikes')
				expect(stateUtilities.mergeSettings).not.toHaveBeenCalled()
			})
		})
	})
})
