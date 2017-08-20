import combineHoundstoothEffects from '../../../src/store/combineHoundstoothEffects'
import storeUtilities from '../../../src/utilities/storeUtilities'

describe('combine houndstooth effects', () => {
	it('warns about conflicts', () => {
		spyOn(storeUtilities, 'composePatterns')

		const houndstoothEffectOne = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		const houndstoothEffectTwo = { basePattern: {}, animationsPattern: {}, layersPattern: {} }
		const houndstoothEffects = [ houndstoothEffectOne, houndstoothEffectTwo ]


		combineHoundstoothEffects({ houndstoothEffects })


		const composePatternsCalls = storeUtilities.composePatterns.calls.all()

		expect(composePatternsCalls.length).toBe(6)

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
