import { combineHoundstoothEffects, composePatterns, Effect } from '../../../../../src'
import CallInfo = jasmine.CallInfo
import Spy = jasmine.Spy

describe('combine houndstooth effects', () => {
	it('warns about conflicts', () => {
		const composePatternsSpy: Spy = spyOn(composePatterns, 'default')

		const houndstoothEffectOne: Effect = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		const houndstoothEffectTwo: Effect = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		const houndstoothEffects: Effect[] = [ houndstoothEffectOne, houndstoothEffectTwo ]

		combineHoundstoothEffects.default({ houndstoothEffects })

		const composePatternsCalls: CallInfo[] = composePatternsSpy.calls.all()

		expect(composePatternsCalls.length).toBe(6)
		// tslint:disable:no-unsafe-any
		expect(composePatternsCalls[ 0 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectOne.basePattern)
		expect(composePatternsCalls[ 0 ].args[ 0 ]).toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 1 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectOne.layersPattern)
		expect(composePatternsCalls[ 1 ].args[ 0 ]).toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 2 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectOne.animationsPattern)
		expect(composePatternsCalls[ 2 ].args[ 0 ]).toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 3 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectTwo.basePattern)
		expect(composePatternsCalls[ 3 ].args[ 0 ]).toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 4 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectTwo.layersPattern)
		expect(composePatternsCalls[ 4 ].args[ 0 ]).toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 5 ].args[ 0 ].patternToMerge).toBe(houndstoothEffectTwo.animationsPattern)
		expect(composePatternsCalls[ 5 ].args[ 0 ]).toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
	})
})
