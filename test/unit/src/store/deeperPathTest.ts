import { deeperPath } from '../../../../src/store/deeperPath'
import * as to from '../../../../src/utilities/to'

describe('deeper path', () => {
	it('does not mutate the passed objects path', () => {
		const originalSettingsPath = to.SettingsPath([ 'colorSettings', 'colorAssignment' ])
		const settingName = to.SettingsStep('colorSet')

		const actualDeeperPath = deeperPath({ settingsPath: originalSettingsPath, settingName })

		expect(actualDeeperPath).toEqual(to.SettingsPath([ 'colorSettings', 'colorAssignment', 'colorSet' ]))
		expect(originalSettingsPath).toEqual(to.SettingsPath([ 'colorSettings', 'colorAssignment' ]))
	})
})
