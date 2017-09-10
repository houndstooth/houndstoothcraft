import composePatterns from '../../../src/execute/composePatterns'
import consoleWrapper from '../../../src/utilities/consoleWrapper'

describe('compose patterns', () => {
	it('merges one pattern onto the other', () => {
		const patternToBeMergedOnto = {
			colorSettings: {
				assignment: {
					assignmentMode: 'yoda',
					switcheroo: 'death star',
				},
			},
			gridSettings: {
				gridSize: 'jedi',
			},
		}
		const patternToMerge = {
			colorSettings: {
				assignment: {
					assignmentMode: 'luke',
				},
			},
			gridSettings: {
				gridSize: 'sith',
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern = {
			colorSettings: {
				assignment: {
					assignmentMode: 'luke',
					switcheroo: 'death star',
				},
			},
			gridSettings: {
				gridSize: 'sith',
			},
		}
		expect(expectedPattern).toEqual(patternToBeMergedOnto)
	})

	it('errors when it notices that a setting being merged onto the pattern does not fit into the pattern structure, and then does not merge it', () => {
		spyOn(consoleWrapper, 'error')
		const patternToBeMergedOnto = {}
		const patternToMerge = {
			colorSettings: {
				assignment: {
					probablyAnAccident: {
						assignmentMode: 'yoda',
						switcheroo: 'death star',
					},
				},
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern = {}
		expect(expectedPattern).toEqual(patternToBeMergedOnto)
		expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a pattern with an unrecognized setting: colorSettings.assignment.probablyAnAccident')
	})

	it('recognizes color objects', () => {
		const patternToBeMergedOnto = {
			colorSettings: {
				backgroundColor: { r: 100, g: 200, b: 0, a: 1 },
			},
		}
		const patternToMerge = {
			colorSettings: {
				backgroundColor: { r: 3, g: 3, b: 3, a: 1 },
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern = {
			colorSettings: {
				backgroundColor: { r: 3, g: 3, b: 3, a: 1 },
			},
		}
		expect(expectedPattern).toEqual(patternToBeMergedOnto)
	})

	it('maybe warns about conflicts', () => {
		const maybeWarnAboutConflictsSpy = jasmine.createSpy()
		composePatterns.__Rewire__('maybeWarnAboutConflicts', maybeWarnAboutConflictsSpy)

		const patternToBeMergedOnto = {
			colorSettings: {
				backgroundColor: { r: 100, g: 200, b: 0, a: 1 },
			},
		}
		const patternToMerge = {
			colorSettings: {
				backgroundColor: { r: 3, g: 3, b: 3, a: 1 },
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		expect(maybeWarnAboutConflictsSpy).toHaveBeenCalled()
	})
})
