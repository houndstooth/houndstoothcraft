import codeUtilities from '../../../src/utilities/codeUtilities'
import composeMainHoundstooth from '../../../src/state/composeMainHoundstooth'
import consoleWrapper from '../../../src/application/consoleWrapper'
import houndstoothDefaults from '../../../src/state/houndstoothDefaults'
import stateUtilities from '../../../src/utilities/stateUtilities'
import store from '../../../store'
import initialState from '../../../src/state/initialState'

describe('composeMainHoundstooth', () => {
	beforeEach(() => {
		store.currentState = codeUtilities.deepClone(initialState.INITIAL_STATE)
	})

	it('logs the houndstooth when logging mode is on', () => {
		spyOn(consoleWrapper, 'log')

		composeMainHoundstooth({ logComposedMainHoundstooth: true })

		expect(consoleWrapper.log).toHaveBeenCalledWith(store.currentState.mainHoundstooth)
	})

	it('does not log the houndstooth when logging mode is not on', () => {
		spyOn(consoleWrapper, 'log')

		composeMainHoundstooth()

		expect(consoleWrapper.log).not.toHaveBeenCalled()
	})

	it('composes the main houndstooth with patterns from the houndstooth defaults, houndstooth effects, and houndstooth overrides', () => {
		spyOn(codeUtilities, 'settingIsDefinedOnSettings').and.returnValue(true)
		composeMainHoundstooth.__Rewire__('setupCanvas', () => {})

		// effects

		const settingFunctionOneD = () => 'D'
		const settingFunctionOneE = () => 'E'
		const settingFunctionOneG = () => 'G'
		const settingFunctionOneH = () => 'H'
		const houndstoothEffectOne = {
			basePattern: {
				settingA: 'A',
				settingB: 'B',
			},
			animationsPattern: {
				settingD: settingFunctionOneD,
				settingE: settingFunctionOneE,
			},
			iterationsPattern: {
				settingG: settingFunctionOneG,
				settingH: settingFunctionOneH,
			},
		}

		const settingFunctionTwoD = () => 'd'
		const settingFunctionTwoF = () => 'f'
		const settingFunctionTwoG = () => 'g'
		const settingFunctionTwoI = () => 'i'
		const houndstoothEffectTwo = {
			basePattern: {
				settingA: 'a',
				settingC: 'c',
			},
			animationsPattern: {
				settingD: settingFunctionTwoD,
				settingF: settingFunctionTwoF,
			},
			iterationsPattern: {
				settingG: settingFunctionTwoG,
				settingI: settingFunctionTwoI,
			},
		}

		const houndstoothEffects = [ houndstoothEffectOne, houndstoothEffectTwo ]

		// defaults

		houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern = {
			settingA: 'pre-a',
			settingJ: 'pre-j',
		}
		const settingFunctionDefaultD = () => 'pre-d'
		const settingFunctionDefaultK = () => 'pre-k'
		houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.animationsPattern = {
			settingD: settingFunctionDefaultD,
			settingK: settingFunctionDefaultK,
		}
		const settingFunctionDefaultG = () => 'pre-g'
		const settingFunctionDefaultL = () => 'pre-l'
		houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.iterationsPattern = {
			settingG: settingFunctionDefaultG,
			settingL: settingFunctionDefaultL,
		}

		// overrides

		const settingFunctionOverridesF = () => 'fF'
		const settingFunctionOverridesN = () => 'nN'
		const settingFunctionOverridesI = () => 'iI'
		const settingFunctionOverridesP = () => 'pP'
		const houndstoothOverrides = {
			basePattern: {
				settingC: 'cC',
				settingM: 'mM',
			},
			animationsPattern: {
				settingF: settingFunctionOverridesF,
				settingN: settingFunctionOverridesN,
			},
			iterationsPattern: {
				settingI: settingFunctionOverridesI,
				settingP: settingFunctionOverridesP,
			},
		}

		composeMainHoundstooth({ houndstoothEffects, houndstoothOverrides })

		expect(store.currentState.mainHoundstooth.basePattern).toEqual(jasmine.objectContaining({
			settingA: 'a',
			settingB: 'B',
			settingC: 'cC',
			settingJ: 'pre-j',
			settingM: 'mM',
		}))
		expect(store.currentState.mainHoundstooth.animationsPattern).toEqual(jasmine.objectContaining({
			settingD: settingFunctionTwoD,
			settingE: settingFunctionOneE,
			settingF: settingFunctionOverridesF,
			settingK: settingFunctionDefaultK,
			settingN: settingFunctionOverridesN,
		}))
		expect(store.currentState.mainHoundstooth.iterationsPattern).toEqual(jasmine.objectContaining({
			settingG: settingFunctionTwoG,
			settingH: settingFunctionOneH,
			settingI: settingFunctionOverridesI,
			settingL: settingFunctionDefaultL,
			settingP: settingFunctionOverridesP,
		}))

		composeMainHoundstooth.__ResetDependency__('setupCanvas')
	})

	describe('when there are things which are not recognized patterns', () => {
		beforeEach(() => {
			spyOn(consoleWrapper, 'error')
			spyOn(stateUtilities, 'composePatterns')
		})

		describe('on one of the houndstooth effects', () => {
			it('does not proceed to merge in these patterns', () => {
				composeMainHoundstooth({ houndstoothEffects: [ { yikesPattern: {} } ] })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(stateUtilities.composePatterns).not.toHaveBeenCalled()
			})
		})

		describe('on the houndstooth overrides', () => {
			it('does not proceed to merge in these patterns', () => {
				composeMainHoundstooth({ houndstoothOverrides: { yikesPattern: {} } })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(stateUtilities.composePatterns).not.toHaveBeenCalled()
			})
		})

		describe('on the houndstooth defaults', () => {
			it('does not proceed to merge in these patterns', () => {
				houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.yikesPattern = {}
				composeMainHoundstooth({ basePattern: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(stateUtilities.composePatterns).not.toHaveBeenCalled()
			})
		})

		describe('already on the main houndstooth (somehow)', () => {
			it('does not proceed to merge in these patterns', () => {
				store.currentState.mainHoundstooth.yikesPattern = {}
				composeMainHoundstooth({ basePattern: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(stateUtilities.composePatterns).not.toHaveBeenCalled()
			})
		})
	})
})
