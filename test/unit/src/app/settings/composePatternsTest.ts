import { AssignmentMode, composePatterns, ComposePatternsParams, Pattern } from '../../../../../src/indexForTest'

const subject: (_: ComposePatternsParams) => void = composePatterns.default

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

		subject({ patternToBeMergedOnto, patternToMerge })

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

	it('defaults the pattern to merge to an empty object, so as to not fail', () => {
		const patternToBeMergedOnto: Pattern = {}
		subject({ patternToBeMergedOnto })
	})
})
