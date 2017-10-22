import { AssignmentMode } from '../../../../src/components/types/AssignmentMode'
import { composePatterns } from '../../../../src/execute/composePatterns'
import * as maybeWarnAboutConflicts from '../../../../src/execute/maybeWarnAboutConflicts'
import * as to from '../../../../src/utilities/to'

describe('compose patterns', () => {
	it('merges one pattern onto the other', () => {
		const patternToBeMergedOnto = {
			colorSettings: {
				colorAssignment: {
					assignmentMode: AssignmentMode.Weave,
					switcheroo: true,
				},
			},
			gridSettings: {
				gridSize: 777,
			},
		}
		const patternToMerge = {
			colorSettings: {
				colorAssignment: {
					assignmentMode: AssignmentMode.Supertile,
				},
			},
			gridSettings: {
				gridSize: 666,
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern = {
			colorSettings: {
				colorAssignment: {
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
		const patternToBeMergedOnto = {
			colorSettings: {
				backgroundColor: to.Color({ r: 100, g: 200, b: 0, a: 1 }),
			},
		}
		const patternToMerge = {
			colorSettings: {
				backgroundColor: to.Color({ r: 3, g: 3, b: 3, a: 1 }),
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern = {
			colorSettings: {
				backgroundColor: to.Color({ r: 3, g: 3, b: 3, a: 1 }),
			},
		}
		expect(expectedPattern).toEqual(patternToBeMergedOnto)
	})

	it('maybe warns about conflicts', () => {
		spyOn(maybeWarnAboutConflicts, 'maybeWarnAboutConflicts')

		const patternToBeMergedOnto = {
			colorSettings: {
				backgroundColor: to.Color({ r: 100, g: 200, b: 0, a: 1 }),
			},
		}
		const patternToMerge = {
			colorSettings: {
				backgroundColor: to.Color({ r: 3, g: 3, b: 3, a: 1 }),
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		expect(maybeWarnAboutConflicts.maybeWarnAboutConflicts).toHaveBeenCalled()
	})
})
