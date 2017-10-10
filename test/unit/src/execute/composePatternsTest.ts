import composePatterns from '../../../../src/execute/composePatterns'
import { console } from '../../../../src/utilities/windowWrapper'
import * as maybeWarnAboutConflicts from '../../../../src/execute/maybeWarnAboutConflicts'

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

	it(`errors when it notices that a setting being merged onto the pattern
		does not fit into the pattern structure, and then does not merge it`, () => {
			spyOn(console, 'error')
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

			// eslint-disable-next-line max-len
			const expectedError = 'attempted to compose a pattern with an unrecognized setting: colorSettings.assignment.probablyAnAccident'
			expect(console.error).toHaveBeenCalledWith(expectedError)
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
		spyOn(maybeWarnAboutConflicts, 'default')

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

		expect(maybeWarnAboutConflicts.default).toHaveBeenCalled()
	})
})
