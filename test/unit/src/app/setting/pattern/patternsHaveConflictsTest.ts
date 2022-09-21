import { Pattern, patternsHaveConflicts, PatternsHaveConflictsParams, to } from '../../../../../../src/indexForTest'

describe('patterns have conflicts', () => {
	let subject: (_: PatternsHaveConflictsParams) => boolean
	beforeEach(() => {
		subject = patternsHaveConflicts.default
	})

	it('returns true if any setting conflict between the two patterns', () => {
		const pattern: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					opacity: 1,
		// @ts-ignore
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
		// @ts-ignore
					flipGrain: false,
					opacity: 0,
				},
			},
			gridSettings: {
				tileResolution: 666,
			},
		}

		expect(subject({ pattern, patternName: to.SettingStep(''), patternCheckingAgainst })).toBe(true)
	})

	it('returns false if the patterns have no conflicting setting', () => {
		const pattern: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					opacity: 1,
		// @ts-ignore
					switcheroo: true,
				},
			},
		}
		const patternCheckingAgainst: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
		// @ts-ignore
					flipGrain: false,
					opacity: 1,
				},
			},
			gridSettings: {
				tileResolution: 777,
			},
		}

		expect(subject({ pattern, patternName: to.SettingStep(''), patternCheckingAgainst })).toBe(false)
	})
})
