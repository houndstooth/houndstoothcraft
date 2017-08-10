import codeUtilities from '../../../src/utilities/codeUtilities'
import composeMainHoundstooth from '../../../src/store/composeMainHoundstooth'
import consoleWrapper from '../../../src/utilities/consoleWrapper'
import houndstoothDefaults from '../../../src/store/houndstoothDefaults'
import storeUtilities from '../../../src/utilities/storeUtilities'
import store from '../../../store'
import resetStore from '../../helpers/resetStore'
import combineHoundstoothEffects from '../../../src/store/combineHoundstoothEffects'

describe('composeMainHoundstooth', () => {
	beforeEach(() => {
		resetStore(store)
	})

	it('logs the houndstooth when logging mode is on', () => {
		spyOn(consoleWrapper, 'log')

		composeMainHoundstooth({ logComposedMainHoundstooth: true })

		expect(consoleWrapper.log).toHaveBeenCalledWith(store.mainHoundstooth)
	})

	it('does not log the houndstooth when logging mode is not on', () => {
		spyOn(consoleWrapper, 'log')

		composeMainHoundstooth()

		expect(consoleWrapper.log).not.toHaveBeenCalled()
	})

	it('composes the main houndstooth with patterns from the houndstooth defaults, houndstooth effects, and houndstooth overrides', () => {
		spyOn(codeUtilities, 'propertyIsDefinedOnObject').and.returnValue(true)
		composeMainHoundstooth.__Rewire__('setupCanvas', () => {
		})

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

		expect(store.mainHoundstooth.basePattern).toEqual(jasmine.objectContaining({
			settingA: 'a',
			settingB: 'B',
			settingC: 'cC',
			settingJ: 'pre-j',
			settingM: 'mM',
		}))
		expect(store.mainHoundstooth.animationsPattern).toEqual(jasmine.objectContaining({
			settingD: settingFunctionTwoD,
			settingE: settingFunctionOneE,
			settingF: settingFunctionOverridesF,
			settingK: settingFunctionDefaultK,
			settingN: settingFunctionOverridesN,
		}))
		expect(store.mainHoundstooth.iterationsPattern).toEqual(jasmine.objectContaining({
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
			spyOn(storeUtilities, 'composePatterns')
		})

		describe('on one of the houndstooth effects', () => {
			it('does not proceed to merge in these patterns', () => {
				composeMainHoundstooth({ houndstoothEffects: [ { yikesPattern: {} } ] })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(storeUtilities.composePatterns).not.toHaveBeenCalled()
			})
		})

		describe('on the houndstooth overrides', () => {
			it('does not proceed to merge in these patterns', () => {
				composeMainHoundstooth({ houndstoothOverrides: { yikesPattern: {} } })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(storeUtilities.composePatterns).not.toHaveBeenCalled()
			})
		})

		describe('on the houndstooth defaults', () => {
			it('does not proceed to merge in these patterns', () => {
				const originalHoundstoothDefaultsToRestoreTo = codeUtilities.deepClone(houndstoothDefaults.HOUNDSTOOTH_DEFAULTS)
				houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.yikesPattern = {}
				composeMainHoundstooth({ basePattern: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(storeUtilities.composePatterns).not.toHaveBeenCalled()
				houndstoothDefaults.HOUNDSTOOTH_DEFAULTS = originalHoundstoothDefaultsToRestoreTo
			})
		})

		describe('already on the main houndstooth (somehow)', () => {
			it('does not proceed to merge in these patterns', () => {
				store.mainHoundstooth.yikesPattern = {}
				composeMainHoundstooth({ basePattern: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(storeUtilities.composePatterns).not.toHaveBeenCalled()
			})
		})
	})

	it('does not warn about conflicts when composing patterns together (though it does warn when combining effects, btw)', () => {
		spyOn(storeUtilities, 'composePatterns')

		const combinedHoundstoothEffects = { basePattern: {}, animationsPattern: {}, iterationsPattern: {} }
		composeMainHoundstooth.__Rewire__('combineHoundstoothEffects', () => combinedHoundstoothEffects)

		const houndstoothOverrides = { basePattern: {}, animationsPattern: {}, iterationsPattern: {} }


		composeMainHoundstooth({ houndstoothOverrides })


		const composePatternsCalls = storeUtilities.composePatterns.calls.all()

		expect(composePatternsCalls.length).toBe(9)

		expect(composePatternsCalls[ 0 ].args[ 0 ].patternToMerge).toBe(houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern)
		expect(composePatternsCalls[ 0 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 1 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.basePattern)
		expect(composePatternsCalls[ 1 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 2 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.basePattern)
		expect(composePatternsCalls[ 2 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 3 ].args[ 0 ].patternToMerge).toBe(houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.iterationsPattern)
		expect(composePatternsCalls[ 3 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 4 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.iterationsPattern)
		expect(composePatternsCalls[ 4 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 5 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.iterationsPattern)
		expect(composePatternsCalls[ 5 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 6 ].args[ 0 ].patternToMerge).toBe(houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.animationsPattern)
		expect(composePatternsCalls[ 6 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 7 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.animationsPattern)
		expect(composePatternsCalls[ 7 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 8 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.animationsPattern)
		expect(composePatternsCalls[ 8 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		composeMainHoundstooth.__ResetDependency__('combineHoundstoothEffects')
	})
})
