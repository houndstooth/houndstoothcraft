import { deeperPath, SettingsPath, SettingsStep, to } from '../../../../../src'

describe('deeper path', () => {
	it('does not mutate the passed objects path', () => {
		const originalSettingsPath: SettingsPath = to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ])
		const settingName: SettingsStep = to.SettingsStep('colorSet')

		const actualDeeperPath: SettingsPath = deeperPath.main({ settingsPath: originalSettingsPath, settingName })

		expect(actualDeeperPath).toEqual(to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings', 'colorSet' ]))
		expect(originalSettingsPath).toEqual(to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ]))
	})
})
