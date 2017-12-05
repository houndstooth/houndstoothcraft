// tslint:disable:no-unsafe-any

import { combineHoundstoothEffects, composePatterns, Effect } from '../../../../../src'
import CallInfo = jasmine.CallInfo
import Spy = jasmine.Spy

describe('combine houndstooth effects', () => {
	it('composes the base, animations, and layers patterns of every effect', () => {
		const composePatternsSpy: Spy = spyOn(composePatterns, 'default')

		const houndstoothEffectOne: Effect = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		const houndstoothEffectTwo: Effect = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		const houndstoothEffects: Effect[] = [ houndstoothEffectOne, houndstoothEffectTwo ]

		combineHoundstoothEffects.default({ houndstoothEffects })

		const composePatternsCalls: CallInfo[] = composePatternsSpy.calls.all()

		expect(composePatternsCalls.length).toBe(6)

		expect(composePatternsCalls[ 0 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectOne.basePattern)
		expect(composePatternsCalls[ 1 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectOne.layersPattern)
		expect(composePatternsCalls[ 2 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectOne.animationsPattern)

		expect(composePatternsCalls[ 3 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectTwo.basePattern)
		expect(composePatternsCalls[ 4 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectTwo.layersPattern)
		expect(composePatternsCalls[ 5 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectTwo.animationsPattern)
	})
})
