import {
	appState,
	combineEffects,
	composeMainHoundstooth,
	ComposeMainHoundstoothParams,
	composePatterns,
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,
	Effect,
	globalWrapper,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo


describe('composeMainHoundstooth', () => {
	let subject: (_?: ComposeMainHoundstoothParams) => void
	beforeEach(() => {
		subject = composeMainHoundstooth.default
	})

	it('logs the houndstooth when logging mode is on', () => {
		spyOn(globalWrapper.console, 'log')

		subject({ logComposedMainHoundstooth: true })

		expect(globalWrapper.console.log).toHaveBeenCalledWith(appState.settings.mainHoundstooth)
	})

	it('does not log the houndstooth when logging mode is not on', () => {
		spyOn(globalWrapper.console, 'log')

		subject()

		expect(globalWrapper.console.log).not.toHaveBeenCalled()
	})

	// tslint:disable-next-line:max-line-length
	it('does not warn about conflicts when composing patterns together (though it does warn when combining effects, btw)', () => {
		const composePatternsSpy: Spy = spyOn(composePatterns, 'default')

		const combinedEffects: Effect = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		spyOn(combineEffects, 'default').and.returnValue(combinedEffects)

		const overrides: Effect = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		subject({ overrides })

		const composePatternsCalls: CallInfo[] = composePatternsSpy.calls.all()

		expect(composePatternsCalls.length).toBe(9)

		// tslint:disable:no-unsafe-any
		expect(composePatternsCalls[ 0 ].args[ 0 ].patternToMerge).toBe(DEFAULT_BASE_PATTERN)
		expect(composePatternsCalls[ 0 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 1 ].args[ 0 ].patternToMerge).toBe(combinedEffects.basePattern)
		expect(composePatternsCalls[ 1 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 2 ].args[ 0 ].patternToMerge).toBe(overrides.basePattern)
		expect(composePatternsCalls[ 2 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 3 ].args[ 0 ].patternToMerge).toBe(DEFAULT_LAYERS_PATTERN)
		expect(composePatternsCalls[ 3 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 4 ].args[ 0 ].patternToMerge).toBe(combinedEffects.layersPattern)
		expect(composePatternsCalls[ 4 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 5 ].args[ 0 ].patternToMerge).toBe(overrides.layersPattern)
		expect(composePatternsCalls[ 5 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 6 ].args[ 0 ].patternToMerge).toBe(DEFAULT_ANIMATIONS_PATTERN)
		expect(composePatternsCalls[ 6 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 7 ].args[ 0 ].patternToMerge).toBe(combinedEffects.animationsPattern)
		expect(composePatternsCalls[ 7 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 8 ].args[ 0 ].patternToMerge).toBe(overrides.animationsPattern)
		expect(composePatternsCalls[ 8 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
	})
})
