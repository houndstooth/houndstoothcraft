import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo
import {
	appState,
	combineEffects,
	composeMainHoundstooth,
	composePatterns,
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,
	Effect,
} from '../../../../../src/indexForTest'

describe('composeMainHoundstooth', () => {
	// tslint:disable-next-line:max-line-length
	it('composes the base, animations, and layers patterns', () => {
		const subject: () => void = composeMainHoundstooth.default
		const composePatternsSpy: Spy = spyOn(composePatterns, 'default')

		const combinedEffects: Effect = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		spyOn(combineEffects, 'default').and.returnValue(combinedEffects)

		appState.settings.overrides = { basePattern: {}, animationsPattern: {}, layersPattern: {} }

		subject()

		const composePatternsCalls: CallInfo[] = composePatternsSpy.calls.all()

		expect(composePatternsCalls.length).toBe(9)

		// tslint:disable:no-unsafe-any
		expect(composePatternsCalls[ 0 ].args[ 0 ].patternToMerge).toBe(DEFAULT_BASE_PATTERN)
		expect(composePatternsCalls[ 0 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 1 ].args[ 0 ].patternToMerge).toBe(combinedEffects.basePattern)
		expect(composePatternsCalls[ 1 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 2 ].args[ 0 ].patternToMerge).toBe(appState.settings.overrides.basePattern)
		expect(composePatternsCalls[ 2 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 3 ].args[ 0 ].patternToMerge).toBe(DEFAULT_LAYERS_PATTERN)
		expect(composePatternsCalls[ 3 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 4 ].args[ 0 ].patternToMerge).toBe(combinedEffects.layersPattern)
		expect(composePatternsCalls[ 4 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 5 ].args[ 0 ].patternToMerge).toBe(appState.settings.overrides.layersPattern)
		expect(composePatternsCalls[ 5 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 6 ].args[ 0 ].patternToMerge).toBe(DEFAULT_ANIMATIONS_PATTERN)
		expect(composePatternsCalls[ 6 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 7 ].args[ 0 ].patternToMerge).toBe(combinedEffects.animationsPattern)
		expect(composePatternsCalls[ 7 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 8 ].args[ 0 ].patternToMerge).toBe(appState.settings.overrides.animationsPattern)
		expect(composePatternsCalls[ 8 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
	})
})
