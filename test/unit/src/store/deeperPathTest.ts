import { deeperPath } from '../../../../src/store/deeperPath'
import { SettingsStep } from '../../../../src/store/types/SettingsStep'
import * as to from '../../../../src/utilities/to'

describe('deeper path', () => {
	it('does not mutate the passed objects path', () => {
		const originalSettingsPath: SettingsStep[] = to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ])
		const settingName: SettingsStep = to.SettingsStep('colorSet')

		const actualDeeperPath: SettingsStep[] = deeperPath({ settingsPath: originalSettingsPath, settingName })

		expect(actualDeeperPath).toEqual(to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings', 'colorSet' ]))
		expect(originalSettingsPath).toEqual(to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ]))
	})
})
