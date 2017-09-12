import codeUtilities from '../../../src/utilities/codeUtilities'
import composeMainHoundstooth from '../../../src/execute/composeMainHoundstooth'
import consoleWrapper from '../../../src/utilities/consoleWrapper'
import store from '../../../src/store'
import state from '../../../state'
import resetState from '../../../src/store/resetState'

describe('composeMainHoundstooth', () => {
	beforeEach(() => {
		resetState(state)
	})

	it('logs the houndstooth when logging mode is on', () => {
		spyOn(consoleWrapper, 'log')

		composeMainHoundstooth({ logComposedMainHoundstooth: true })

		expect(consoleWrapper.log).toHaveBeenCalledWith(state.mainHoundstooth)
	})

	it('does not log the houndstooth when logging mode is not on', () => {
		spyOn(consoleWrapper, 'log')

		composeMainHoundstooth()

		expect(consoleWrapper.log).not.toHaveBeenCalled()
	})

	it('composes the main houndstooth with patterns from the houndstooth defaults, houndstooth effects, and houndstooth overrides', () => {
		spyOn(codeUtilities, 'propertyIsDefinedOnObject').and.returnValue(true)
		spyOn(consoleWrapper, 'warn')

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
			layersPattern: {
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
			layersPattern: {
				settingG: settingFunctionTwoG,
				settingI: settingFunctionTwoI,
			},
		}

		const houndstoothEffects = [ houndstoothEffectOne, houndstoothEffectTwo ]

		// defaults

		store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern = {
			settingA: 'pre-a',
			settingJ: 'pre-j',
		}
		const settingFunctionDefaultD = () => 'pre-d'
		const settingFunctionDefaultK = () => 'pre-k'
		store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.animationsPattern = {
			settingD: settingFunctionDefaultD,
			settingK: settingFunctionDefaultK,
		}
		const settingFunctionDefaultG = () => 'pre-g'
		const settingFunctionDefaultL = () => 'pre-l'
		store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.layersPattern = {
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
			layersPattern: {
				settingI: settingFunctionOverridesI,
				settingP: settingFunctionOverridesP,
			},
		}

		composeMainHoundstooth({ houndstoothEffects, houndstoothOverrides })

		expect(state.mainHoundstooth.basePattern).toEqual(jasmine.objectContaining({
			settingA: 'a',
			settingB: 'B',
			settingC: 'cC',
			settingJ: 'pre-j',
			settingM: 'mM',
		}))
		expect(state.mainHoundstooth.animationsPattern).toEqual(jasmine.objectContaining({
			settingD: settingFunctionTwoD,
			settingE: settingFunctionOneE,
			settingF: settingFunctionOverridesF,
			settingK: settingFunctionDefaultK,
			settingN: settingFunctionOverridesN,
		}))
		expect(state.mainHoundstooth.layersPattern).toEqual(jasmine.objectContaining({
			settingG: settingFunctionTwoG,
			settingH: settingFunctionOneH,
			settingI: settingFunctionOverridesI,
			settingL: settingFunctionDefaultL,
			settingP: settingFunctionOverridesP,
		}))
	})

	describe('when there are things which are not recognized patterns', () => {
		let composePatternsSpy
		beforeEach(() => {
			spyOn(consoleWrapper, 'error')

			composePatternsSpy = jasmine.createSpy()
			composeMainHoundstooth.__Rewire__('composePatterns', composePatternsSpy)
		})

		describe('on one of the houndstooth effects', () => {
			it('does not proceed to merge in these patterns', () => {
				composeMainHoundstooth({ houndstoothEffects: [ { yikesPattern: {} } ] })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(composePatternsSpy).not.toHaveBeenCalled()
			})
		})

		describe('on the houndstooth overrides', () => {
			it('does not proceed to merge in these patterns', () => {
				composeMainHoundstooth({ houndstoothOverrides: { yikesPattern: {} } })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(composePatternsSpy).not.toHaveBeenCalled()
			})
		})

		describe('on the houndstooth defaults', () => {
			it('does not proceed to merge in these patterns', () => {
				const originalHoundstoothDefaultsToRestoreTo = codeUtilities.deepClone(store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS)
				store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.yikesPattern = {}
				composeMainHoundstooth({ basePattern: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(composePatternsSpy).not.toHaveBeenCalled()
				store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS = originalHoundstoothDefaultsToRestoreTo
			})
		})

		describe('already on the main houndstooth (somehow)', () => {
			it('does not proceed to merge in these patterns', () => {
				state.mainHoundstooth.yikesPattern = {}
				composeMainHoundstooth({ basePattern: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(composePatternsSpy).not.toHaveBeenCalled()
			})
		})

		afterEach(() => {
			composeMainHoundstooth.__ResetDependency__('composePatterns', composePatternsSpy)
		})
	})

	it('does not warn about conflicts when composing patterns together (though it does warn when combining effects, btw)', () => {
		const composePatternsSpy = jasmine.createSpy()
		composeMainHoundstooth.__Rewire__('composePatterns', composePatternsSpy)

		const combinedHoundstoothEffects = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		composeMainHoundstooth.__Rewire__('combineHoundstoothEffects', () => combinedHoundstoothEffects)

		const houndstoothOverrides = { basePattern: {}, animationsPattern: {}, layersPattern: {} }


		composeMainHoundstooth({ houndstoothOverrides })


		const composePatternsCalls = composePatternsSpy.calls.all()

		expect(composePatternsCalls.length).toBe(9)

		expect(composePatternsCalls[ 0 ].args[ 0 ].patternToMerge).toBe(store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern)
		expect(composePatternsCalls[ 0 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 1 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.basePattern)
		expect(composePatternsCalls[ 1 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 2 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.basePattern)
		expect(composePatternsCalls[ 2 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 3 ].args[ 0 ].patternToMerge).toBe(store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.layersPattern)
		expect(composePatternsCalls[ 3 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 4 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.layersPattern)
		expect(composePatternsCalls[ 4 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 5 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.layersPattern)
		expect(composePatternsCalls[ 5 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 6 ].args[ 0 ].patternToMerge).toBe(store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.animationsPattern)
		expect(composePatternsCalls[ 6 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 7 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.animationsPattern)
		expect(composePatternsCalls[ 7 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 8 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.animationsPattern)
		expect(composePatternsCalls[ 8 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		composeMainHoundstooth.__ResetDependency__('combineHoundstoothEffects')
		composeMainHoundstooth.__ResetDependency__('composePatterns')
	})
})
