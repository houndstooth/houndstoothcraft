import {
	appState,
	createOverrideLeafNode,
	FullSettingPath,
	SettingPath,
	SettingStep,
	to,
} from '../../../../../src/indexForTest'

describe('create override leaf node', () => {
	it('creates the path to it and initializes nodes on the way', () => {
		const subject: (_: FullSettingPath) => void = createOverrideLeafNode.default
		const patternName: SettingStep = to.SettingStep('animationsPattern')
		const settingPath: SettingPath = to.SettingPath([ 'colorSettings', 'colorAssignmentSettings' ])
		const settingName: SettingStep = to.SettingStep('opacity')

		subject({ patternName, settingName, settingPath })

		expect(appState.controls.overrideNodes).toEqual({
			children: {
				animationsPattern: {
					children: {
						colorSettings: {
							children: {
								colorAssignmentSettings: {
									children: {
										opacity: {
											overriding: false,
										},
									},
									open: false,
								},
							},
							open: false,
						},
					},
					open: false,
				},
				basePattern: {
					children: {},
					open: true,
				},
				layersPattern: {
					children: {},
					open: false,
				},
			},
			open: true,
		})
	})
})
