import houndstoothHasOnlyRecognizedPatterns from '../../../src/execute/houndstoothHasOnlyRecognizedPatterns'
import consoleWrapper from '../../../src/utilities/consoleWrapper'

describe('houndstooth has only recognized patterns', () => {
	const basePattern = {}
	const animationsPattern = {}
	const layersPattern = {}
	const invalidSettings = {}

	it('returns true even if the pattern contains the name field; that one is okay', () => {
		expect(houndstoothHasOnlyRecognizedPatterns({ name: 'some name' })).toBe(true)
	})

	it('returns true even if the pattern contains only some subset of the recognized settings', () => {
		expect(houndstoothHasOnlyRecognizedPatterns({})).toBe(true)
		expect(houndstoothHasOnlyRecognizedPatterns({ basePattern })).toBe(true)
		expect(houndstoothHasOnlyRecognizedPatterns({ animationsPattern })).toBe(true)
		expect(houndstoothHasOnlyRecognizedPatterns({ layersPattern })).toBe(true)
		expect(houndstoothHasOnlyRecognizedPatterns({ basePattern, animationsPattern })).toBe(true)
		expect(houndstoothHasOnlyRecognizedPatterns({ basePattern, layersPattern })).toBe(true)
		expect(houndstoothHasOnlyRecognizedPatterns({ animationsPattern, layersPattern })).toBe(true)
		expect(houndstoothHasOnlyRecognizedPatterns({
			basePattern,
			animationsPattern,
			layersPattern,
		})).toBe(true)
	})

	it('logs an error if the pattern contains anything other than one of these three recognized patterns, or name', () => {
		spyOn(consoleWrapper, 'error')

		houndstoothHasOnlyRecognizedPatterns({ invalidSettings: {} })

		expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: invalidSettings')
	})

	it('returns false, even if the pattern contains some or all of the three recognized settings in addition to an invalid one', () => {
		spyOn(consoleWrapper, 'error')

		expect(houndstoothHasOnlyRecognizedPatterns({ invalidSettings })).toBe(false)
		expect(houndstoothHasOnlyRecognizedPatterns({
			invalidSettings,
			basePattern,
		})).toBe(false)
		expect(houndstoothHasOnlyRecognizedPatterns({
			invalidSettings,
			animationsPattern,
		})).toBe(false)
		expect(houndstoothHasOnlyRecognizedPatterns({
			invalidSettings,
			layersPattern,
		})).toBe(false)
		expect(houndstoothHasOnlyRecognizedPatterns({
			invalidSettings,
			basePattern,
			animationsPattern,
		})).toBe(false)
		expect(houndstoothHasOnlyRecognizedPatterns({
			invalidSettings,
			basePattern,
			layersPattern,
		})).toBe(false)
		expect(houndstoothHasOnlyRecognizedPatterns({
			invalidSettings,
			animationsPattern,
			layersPattern,
		})).toBe(false)
		expect(houndstoothHasOnlyRecognizedPatterns({
			invalidSettings,
			basePattern,
			animationsPattern,
			layersPattern,
		})).toBe(false)
	})
})
