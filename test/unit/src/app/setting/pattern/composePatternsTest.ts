import {
	AssignmentMode,
	composePatterns,
	ComposePatternsParams,
	mapOverPattern,
	Pattern,
} from '../../../../../../src/indexForTest'

describe('compose patterns', () => {
	let subject: (_: ComposePatternsParams) => void
	beforeEach(() => {
		subject = composePatterns.default
	})

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
		spyOn(mapOverPattern, 'default')
		subject({ patternToBeMergedOnto })

		expect(mapOverPattern.default).toHaveBeenCalledWith({
			options: { patternToBeMergedOnto: {} },
			pattern: {},
			perLeaf: jasmine.any(Function),
		})
	})
})
