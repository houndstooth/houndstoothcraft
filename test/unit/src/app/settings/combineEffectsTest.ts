// tslint:disable:no-unsafe-any

import { combineEffects, composePatterns, Effect } from '../../../../../src'
import CallInfo = jasmine.CallInfo
import Spy = jasmine.Spy

const subject: (_: { effects: Effect[] }) => Effect = combineEffects.default

describe('combine effects', () => {
	it('composes the base, animations, and layers patterns of every effect', () => {
		const composePatternsSpy: Spy = spyOn(composePatterns, 'default')

		const effectOne: Effect = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		const effectTwo: Effect = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		const effects: Effect[] = [ effectOne, effectTwo ]

		subject({ effects })

		const composePatternsCalls: CallInfo[] = composePatternsSpy.calls.all()

		expect(composePatternsCalls.length).toBe(6)

		expect(composePatternsCalls[ 0 ].args[ 0 ].patternToMerge).toBe(effectOne.basePattern)
		expect(composePatternsCalls[ 1 ].args[ 0 ].patternToMerge).toBe(effectOne.layersPattern)
		expect(composePatternsCalls[ 2 ].args[ 0 ].patternToMerge).toBe(effectOne.animationsPattern)

		expect(composePatternsCalls[ 3 ].args[ 0 ].patternToMerge).toBe(effectTwo.basePattern)
		expect(composePatternsCalls[ 4 ].args[ 0 ].patternToMerge).toBe(effectTwo.layersPattern)
		expect(composePatternsCalls[ 5 ].args[ 0 ].patternToMerge).toBe(effectTwo.animationsPattern)
	})
})
