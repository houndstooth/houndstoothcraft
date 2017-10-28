import { AssignmentMode } from '../../../../src/components'
import { composePatterns } from '../../../../src/execute/composePatterns'
import * as maybeWarnAboutConflicts from '../../../../src/execute/maybeWarnAboutConflicts'
import { Pattern } from '../../../../src/store/types'

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
				gridSize: 777,
			},
		}
		const patternToMerge: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Supertile,
				},
			},
			gridSettings: {
				gridSize: 666,
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					assignmentMode: AssignmentMode.Supertile,
					switcheroo: true,
				},
			},
			gridSettings: {
				gridSize: 666,
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

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern: Pattern = {
			colorSettings: {
				backgroundColor: { r: 3, g: 3, b: 3, a: 1 },
			},
		}
		expect(expectedPattern).toEqual(patternToBeMergedOnto)
	})

	it('maybe warns about conflicts', () => {
		spyOn(maybeWarnAboutConflicts, 'maybeWarnAboutConflicts')

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

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		expect(maybeWarnAboutConflicts.maybeWarnAboutConflicts).toHaveBeenCalled()
	})
})
