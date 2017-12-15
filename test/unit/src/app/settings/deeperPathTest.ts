import { deeperPath, FullSettingPath, SettingPath, SettingStep, to } from '../../../../../src/indexForTest'

describe('deeper path', () => {
	it('does not mutate the passed objects path', () => {
		const subject: (_: FullSettingPath) => SettingPath = deeperPath.default
		const originalSettingPath: SettingPath = to.SettingPath([ 'colorSettings', 'colorAssignmentSettings' ])
		const settingName: SettingStep = to.SettingStep('colorSet')

		const actualDeeperPath: SettingPath = subject({ settingPath: originalSettingPath, settingName })

		expect(actualDeeperPath).toEqual(to.SettingPath([ 'colorSettings', 'colorAssignmentSettings', 'colorSet' ]))
		expect(originalSettingPath).toEqual(to.SettingPath([ 'colorSettings', 'colorAssignmentSettings' ]))
	})
})
