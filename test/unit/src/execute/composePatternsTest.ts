import { AssignmentMode } from '../../../../src/components/types/AssignmentMode'
import { composePatterns } from '../../../../src/execute/composePatterns'
import * as maybeWarnAboutConflicts from '../../../../src/execute/maybeWarnAboutConflicts'

describe('compose patterns', () => {
	it('merges one pattern onto the other', () => {
		const patternToBeMergedOnto = {
			colorSettings: {
				assignment: {
					assignmentMode: AssignmentMode.WEAVE,
					switcheroo: true,
				},
			},
			gridSettings: {
				gridSize: 777,
			},
		}
		const patternToMerge = {
			colorSettings: {
				assignment: {
					assignmentMode: AssignmentMode.SUPERTILE,
				},
			},
			gridSettings: {
				gridSize: 666,
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern = {
			colorSettings: {
				assignment: {
					assignmentMode: AssignmentMode.SUPERTILE,
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
		spyOn(maybeWarnAboutConflicts, 'maybeWarnAboutConflicts')

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

		expect(maybeWarnAboutConflicts.maybeWarnAboutConflicts).toHaveBeenCalled()
	})
})
