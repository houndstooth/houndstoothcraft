import { buildSettingsPathShortcuts } from '../../../../src/store/buildSettingsPathShortcuts'
import { SettingsPath } from '../../../../src/store/types'
import * as to from '../../../../src/utilities/to'

describe('build settings path shortcuts', () => {
	it('maps a setting\'s name as a shortcut to its full path in the settings tree, from the current base', () => {
		interface ExampleSettingsStructure {
			settingOne: {},
			settingTwo: {},
		}

		interface ExampleSettings extends ExampleSettingsStructure {
			settingOne: number,
			settingTwo: string,
			[_: string]: number | string,
		}

		const exampleSettings: ExampleSettings = {
			settingOne: 3,
			settingTwo: 'four',
		}
		const basePath: SettingsPath = to.SettingsPath([ 'parentSettings', 'exampleSettings' ])

		const actualSettingPathShortcuts: ExampleSettingsStructure = buildSettingsPathShortcuts({
			basePath,
			settings: exampleSettings,
		})

		const expectedSettingsPathShortcuts: ExampleSettingsStructure = {
			settingOne: to.SettingsPath([ 'parentSettings', 'exampleSettings', 'settingOne' ]),
			settingTwo: to.SettingsPath([ 'parentSettings', 'exampleSettings', 'settingTwo' ]),
		}
		expect(actualSettingPathShortcuts).toEqual(expectedSettingsPathShortcuts)
	})
})
