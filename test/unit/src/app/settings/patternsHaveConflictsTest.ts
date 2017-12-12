import { Pattern, patternsHaveConflicts, PatternsHaveConflictsParams } from '../../../../../src/indexForTest'

describe('patterns have conflicts', () => {
	let subject: (_: PatternsHaveConflictsParams) => boolean
	beforeEach(() => {
		subject = patternsHaveConflicts.default
	})

	it('returns true if any settings conflict between the two patterns', () => {
		const pattern: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					opacity: 1,
					switcheroo: true,
				},
			},
			gridSettings: {
				tileResolution: 777,
			},
		}
		const patternCheckingAgainst: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					opacity: 0,
				},
			},
			gridSettings: {
				tileResolution: 666,
			},
		}

		expect(subject({ pattern, patternCheckingAgainst })).toBe(true)
	})

	it('returns false if the patterns have no conflicting settings', () => {
		const pattern: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					opacity: 1,
					switcheroo: true,
				},
			},
		}
		const patternCheckingAgainst: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					opacity: 1,
				},
			},
			gridSettings: {
				tileResolution: 777,
			},
		}

		expect(subject({ pattern, patternCheckingAgainst })).toBe(false)
	})
})
