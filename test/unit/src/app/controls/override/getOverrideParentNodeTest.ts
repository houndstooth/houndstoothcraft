import {
	createOverrideNodes,
	FullSettingPath,
	getOverrideParentNode,
	OverrideParentNode,
	SettingPath,
	SettingStep,
	to,
} from '../../../../../../src/indexForTest'

describe('get override parent node', () => {
	it('returns the override node', () => {
		const subject: (_: FullSettingPath) => OverrideParentNode = getOverrideParentNode.default
		const patternName: SettingStep = to.SettingStep('animationsPattern')
		const settingPath: SettingPath = to.SettingPath([ 'stripeSettings', 'stripePositionSettings' ])
		const settingName: SettingStep = to.SettingStep('stripeCountContinuumSettings')
		createOverrideNodes.default()

		expect(subject({ patternName, settingName, settingPath })).toEqual({
			children: {
				deltaStripeCount: { overriding: false },
				initialStripeCount: { overriding: false },
			},
			open: false,
		})
	})
})
