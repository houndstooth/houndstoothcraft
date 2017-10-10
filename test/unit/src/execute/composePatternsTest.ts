import composePatterns from '../../../../src/execute/composePatterns'
import { console } from '../../../../src/utilities/windowWrapper'
import * as maybeWarnAboutConflicts from '../../../../src/execute/maybeWarnAboutConflicts'

describe('compose patterns', () => {
	it('merges one pattern onto the other', () => {
		const patternToBeMergedOnto = {
			colorSettings: {
				assignment: {
					assignmentMode: 'yoda',
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
					assignmentMode: 'luke',
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
					assignmentMode: 'luke',
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
