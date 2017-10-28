import { buildSettingsPathShortcuts } from '../../../../src/store/buildSettingsPathShortcuts'
import * as to from '../../../../src/utilities/to'

describe('build settings path shortcuts', () => {
	it('maps a setting\'s name as a shortcut to its full path in the settings tree, from the current base', () => {
		const exampleSettings = {
			settingOne: 3,
			settingTwo: 'four',
		}
		const basePath = to.SettingsPath([ 'parentSettings', 'exampleSettings' ])

		const actualSettingPathShortcuts = buildSettingsPathShortcuts({ settings: exampleSettings, basePath })

		const expectedSettingsPathShortcuts = {
			settingOne: to.SettingsPath([ 'parentSettings', 'exampleSettings', 'settingOne' ]),
			settingTwo: to.SettingsPath([ 'parentSettings', 'exampleSettings', 'settingTwo' ]),
		}
		expect(actualSettingPathShortcuts).toEqual(expectedSettingsPathShortcuts)
	})
})
