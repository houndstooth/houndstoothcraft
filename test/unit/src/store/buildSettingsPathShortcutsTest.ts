import { buildSettingsNamesToPathsMap } from '../../../../src/store/buildSettingsNamesToPathsMap'
import { SettingsPath } from '../../../../src/store/types'
import * as to from '../../../../src/utilities/to'

describe('build settings names to paths map', () => {
	it('maps a setting\'s name to its full path in the settings tree, from the current base', () => {
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

		const actualSettingTypedSettingsNames: ExampleSettingsStructure = buildSettingsNamesToPathsMap({
			basePath,
			settings: exampleSettings,
		})

		const expectedSettingsNamesToPathsMap: ExampleSettingsStructure = {
			settingOne: to.SettingsPath([ 'parentSettings', 'exampleSettings', 'settingOne' ]),
			settingTwo: to.SettingsPath([ 'parentSettings', 'exampleSettings', 'settingTwo' ]),
		}
		expect(actualSettingTypedSettingsNames).toEqual(expectedSettingsNamesToPathsMap)
	})
})
