import {
	combineHoundstoothEffects,
	composeMainHoundstooth,
	composePatterns,
	consoleWrapper,
	defaults,
	Effect,
	state,
} from '../../../../../src'
import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo

const {
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,
} = defaults

describe('composeMainHoundstooth', () => {
	it('logs the houndstooth when logging mode is on', () => {
		spyOn(consoleWrapper, 'log')

		composeMainHoundstooth.default({ logComposedMainHoundstooth: true })

		expect(consoleWrapper.log).toHaveBeenCalledWith(state.mainHoundstooth)
	})

	it('does not log the houndstooth when logging mode is not on', () => {
		spyOn(consoleWrapper, 'log')

		composeMainHoundstooth.default()

		expect(consoleWrapper.log).not.toHaveBeenCalled()
	})

	// tslint:disable-next-line:max-line-length
	it('does not warn about conflicts when composing patterns together (though it does warn when combining effects, btw)', () => {
		const composePatternsSpy: Spy = spyOn(composePatterns, 'default')

		const combinedHoundstoothEffects: Effect = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		spyOn(combineHoundstoothEffects, 'default').and.returnValue(combinedHoundstoothEffects)

		const houndstoothOverrides: Effect = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		composeMainHoundstooth.default({ houndstoothOverrides })

		const composePatternsCalls: CallInfo[] = composePatternsSpy.calls.all()

		expect(composePatternsCalls.length).toBe(9)

		// tslint:disable:no-unsafe-any
		expect(composePatternsCalls[ 0 ].args[ 0 ].patternToMerge).toBe(DEFAULT_BASE_PATTERN)
		expect(composePatternsCalls[ 0 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 1 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.basePattern)
		expect(composePatternsCalls[ 1 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 2 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.basePattern)
		expect(composePatternsCalls[ 2 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 3 ].args[ 0 ].patternToMerge).toBe(DEFAULT_LAYERS_PATTERN)
		expect(composePatternsCalls[ 3 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 4 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.layersPattern)
		expect(composePatternsCalls[ 4 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 5 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.layersPattern)
		expect(composePatternsCalls[ 5 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))

		expect(composePatternsCalls[ 6 ].args[ 0 ].patternToMerge).toBe(DEFAULT_ANIMATIONS_PATTERN)
		expect(composePatternsCalls[ 6 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 7 ].args[ 0 ].patternToMerge).toBe(combinedHoundstoothEffects.animationsPattern)
		expect(composePatternsCalls[ 7 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
		expect(composePatternsCalls[ 8 ].args[ 0 ].patternToMerge).toBe(houndstoothOverrides.animationsPattern)
		expect(composePatternsCalls[ 8 ].args[ 0 ]).not.toEqual(jasmine.objectContaining({ warnAboutConflicts: true }))
	})
})
