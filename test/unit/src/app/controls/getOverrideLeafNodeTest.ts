import {
	createOverrideNodes,
	FullSettingPath,
	getOverrideLeafNode,
	OverrideLeafNode,
	SettingPath,
	SettingStep,
	to,
} from '../../../../../src/indexForTest'

describe('get override leaf node', () => {
	it('is just like get override parent node, unfortunately, but have to do some type dancing', () => {
		const subject: (_: FullSettingPath) => OverrideLeafNode = getOverrideLeafNode.default
		const patternName: SettingStep = to.SettingStep('animationsPattern')
		const settingPath: SettingPath = to.SettingPath([ 'stripeSettings', 'stripePositionSettings' ])
		const settingName: SettingStep = to.SettingStep('stripeCount')
		createOverrideNodes.default()

		expect(subject({ patternName, settingName, settingPath })).toEqual({
			overriding: false,
		})
	})
})
