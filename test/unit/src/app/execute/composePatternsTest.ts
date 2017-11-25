import { AssignmentMode, composePatterns, maybeWarnAboutConflicts, Pattern } from '../../../../../src'

describe('compose patterns', () => {
	it('merges one pattern onto the other', () => {
		const patternToBeMergedOnto: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Weave,
					switcheroo: true,
				},
			},
			gridSettings: {
				tileResolution: 777,
			},
		}
		const patternToMerge: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Supertile,
				},
			},
			gridSettings: {
				tileResolution: 666,
			},
		}

		composePatterns.main({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Supertile,
					switcheroo: true,
				},
			},
			gridSettings: {
				tileResolution: 666,
			},
		}
		expect(expectedPattern).toEqual(patternToBeMergedOnto)
	})

	it('recognizes color objects', () => {
		const patternToBeMergedOnto: Pattern = {
			colorSettings: {
				backgroundColor: { r: 100, g: 200, b: 0, a: 1 },
			},
		}
		const patternToMerge: Pattern = {
			colorSettings: {
				backgroundColor: { r: 3, g: 3, b: 3, a: 1 },
			},
		}

		composePatterns.main({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern: Pattern = {
			colorSettings: {
				backgroundColor: { r: 3, g: 3, b: 3, a: 1 },
			},
		}
		expect(expectedPattern).toEqual(patternToBeMergedOnto)
	})

	it('maybe warns about conflicts', () => {
		spyOn(maybeWarnAboutConflicts, 'main')

		const patternToBeMergedOnto: Pattern = {
			colorSettings: {
				backgroundColor: { r: 100, g: 200, b: 0, a: 1 },
			},
		}
		const patternToMerge: Pattern = {
			colorSettings: {
				backgroundColor: { r: 3, g: 3, b: 3, a: 1 },
			},
		}

		composePatterns.main({ patternToBeMergedOnto, patternToMerge })

		expect(maybeWarnAboutConflicts.main).toHaveBeenCalled()
	})

	it('defaults the pattern to merge to an empty object, so as to not fail', () => {
		const patternToBeMergedOnto: Pattern = {}
		composePatterns.main({ patternToBeMergedOnto })
	})
})
