import * as codeUtilities from '../../../src/utilities/codeUtilities'
import composeMainHoundstooth from '../../../src/execute/composeMainHoundstooth'
import consoleWrapper from '../../../src/utilities/consoleWrapper'
import { DEFAULT_HOUNDSTOOTH } from '../../../src/store/defaults'
import state from '../../../src/state'
import resetState from '../../../src/store/resetState'
import * as combineHoundstoothEffects from '../../../src/execute/combineHoundstoothEffects'
import * as composePatterns from '../../../src/execute/composePatterns'

describe('composeMainHoundstooth', () => {
	beforeEach(() => resetState(state))

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

		const originalHoundstoothDefaultsToRestoreTo = codeUtilities.deepClone(DEFAULT_HOUNDSTOOTH)
		DEFAULT_HOUNDSTOOTH.basePattern = {
			settingA: 'pre-a',
			settingJ: 'pre-j',
		}
		const settingFunctionDefaultD = () => 'pre-d'
		const settingFunctionDefaultK = () => 'pre-k'
		DEFAULT_HOUNDSTOOTH.animationsPattern = {
			settingD: settingFunctionDefaultD,
			settingK: settingFunctionDefaultK,
		}
		const settingFunctionDefaultG = () => 'pre-g'
		const settingFunctionDefaultL = () => 'pre-l'
		DEFAULT_HOUNDSTOOTH.layersPattern = {
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

		codeUtilities.changeObjectIntoCopy({
			objectToChange: DEFAULT_HOUNDSTOOTH,
			objectWithProperties: originalHoundstoothDefaultsToRestoreTo,
		})
	})

	describe('when there are things which are not recognized patterns', () => {
		beforeEach(() => {
			spyOn(consoleWrapper, 'error')
			spyOn(composePatterns, 'default')
		})

		describe('on one of the houndstooth effects', () => {
			it('does not proceed to merge in these patterns', () => {
				composeMainHoundstooth({ houndstoothEffects: [ { yikesPattern: {} } ] })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(composePatterns.default).not.toHaveBeenCalled()
			})
		})

		describe('on the houndstooth overrides', () => {
			it('does not proceed to merge in these patterns', () => {
				composeMainHoundstooth({ houndstoothOverrides: { yikesPattern: {} } })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(composePatterns.default).not.toHaveBeenCalled()
			})
		})

		describe('on the houndstooth defaults', () => {
			it('does not proceed to merge in these patterns', () => {
				const originalHoundstoothDefaultsToRestoreTo = codeUtilities.deepClone(DEFAULT_HOUNDSTOOTH)
				DEFAULT_HOUNDSTOOTH.yikesPattern = {}
				composeMainHoundstooth({ basePattern: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(composePatterns.default).not.toHaveBeenCalled()

				codeUtilities.changeObjectIntoCopy({
					objectToChange: DEFAULT_HOUNDSTOOTH,
					objectWithProperties: originalHoundstoothDefaultsToRestoreTo,
				})
			})
		})

		describe('already on the main houndstooth (somehow)', () => {
			it('does not proceed to merge in these patterns', () => {
				state.mainHoundstooth.yikesPattern = {}
				composeMainHoundstooth({ basePattern: {} })
				expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: yikesPattern')
				expect(composePatterns.default).not.toHaveBeenCalled()
			})
		})
	})

	it('does not warn about conflicts when composing patterns together (though it does warn when combining effects, btw)', () => {
		spyOn(composePatterns, 'default')

		const combinedHoundstoothEffects = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		spyOn(combineHoundstoothEffects, 'default').and.returnValue(combinedHoundstoothEffects)


		const houndstoothOverrides = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		composeMainHoundstooth({ houndstoothOverrides })


		const composePatternsCalls = composePatterns.default.calls.all()

		expect(composePatternsCalls.length).toBe(9)

		expect(composePatternsCalls[ 0 ].args[ 0 ].patternToMerge).toBe(DEFAULT_HOUNDSTOOTH.basePattern)
		expect(composePatternsCalls[ 0 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 1 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.basePattern)
		expect(composePatternsCalls[ 1 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 2 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.basePattern)
		expect(composePatternsCalls[ 2 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 3 ].args[ 0 ].patternToMerge).toBe(DEFAULT_HOUNDSTOOTH.layersPattern)
		expect(composePatternsCalls[ 3 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 4 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.layersPattern)
		expect(composePatternsCalls[ 4 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 5 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.layersPattern)
		expect(composePatternsCalls[ 5 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 6 ].args[ 0 ].patternToMerge).toBe(DEFAULT_HOUNDSTOOTH.animationsPattern)
		expect(composePatternsCalls[ 6 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 7 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.animationsPattern)
		expect(composePatternsCalls[ 7 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 8 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.animationsPattern)
		expect(composePatternsCalls[ 8 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
	})
})
