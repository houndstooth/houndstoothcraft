// tslint:disable:no-unsafe-any

import { appState, combineEffects, composePatterns, Effect, NamedEffect } from '../../../../../src/indexForTest'
import CallInfo = jasmine.CallInfo
import Spy = jasmine.Spy

describe('combine effects', () => {
	it('composes the base, animations, and layers patterns of every effect', () => {
		const subject: () => Effect = combineEffects.default

		const composePatternsSpy: Spy = spyOn(composePatterns, 'default')

		const effectOne: NamedEffect = {
			animationsPattern: {},
			basePattern: {},
			description: '',
			layersPattern: {},
			name: '',
		}
		const effectTwo: NamedEffect = {
			animationsPattern: {},
			basePattern: {},
			description: '',
			layersPattern: {},
			name: '',
		}
		appState.controls.selectedEffects = [ effectOne, effectTwo ]

		subject()

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
