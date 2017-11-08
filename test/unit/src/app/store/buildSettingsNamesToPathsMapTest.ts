import { buildSettingsNamesToPathsMap } from '../../../../../src/app/store/buildSettingsNamesToPathsMap'
import { SettingsPath } from '../../../../../src/app/store/types'
import * as to from '../../../../../src/to'
import { ExampleSettings, ExampleSettingsStructure } from '../../../helpers/types'

describe('build settings names to paths map', () => {
	it('maps a setting\'s name to its full path in the settings tree, from the current base', () => {
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
			settingOne: to.SettingsPath([ 'parentSettings', 'exampleSettings' ]),
			settingTwo: to.SettingsPath([ 'parentSettings', 'exampleSettings' ]),
		}
		expect(actualSettingTypedSettingsNames).toEqual(expectedSettingsNamesToPathsMap)
	})
})
