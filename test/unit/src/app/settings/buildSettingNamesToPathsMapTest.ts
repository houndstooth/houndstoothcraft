import {
	appState,
	buildSettingNamesToPathsMap,
	BuildSettingNamesToPathsMapParams,
	Pattern,
	SettingNamesToPathsMap,
	to,
} from '../../../../../src'

const subject: (_?: BuildSettingNamesToPathsMapParams) => void = buildSettingNamesToPathsMap.default

describe('build settings names to paths map', () => {
	it('maps each setting\'s name to its full path in the pattern structure, saving onto the app state', () => {
		appState.settings.settingNamesToPathsMap = {}
		const settings: Pattern = {
			colorSettings: {
				colorAssignmentSettings: {
					switcheroo: true,
				},
			},
			gridSettings: {
				tileResolution: 777,
			},
		}

		subject({ settings })

		const expectedSettingNamesToPathsMap: SettingNamesToPathsMap = {
			colorAssignmentSettings: to.SettingsPath([ 'colorSettings' ]),
			colorSettings: to.SettingsPath([]),
			gridSettings: to.SettingsPath([]),
			switcheroo: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ]),
			tileResolution: to.SettingsPath([ 'gridSettings' ]),
		}
		expect(appState.settings.settingNamesToPathsMap).toEqual(expectedSettingNamesToPathsMap)
	})
})
