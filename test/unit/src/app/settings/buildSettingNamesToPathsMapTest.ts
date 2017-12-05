import {
	buildSettingNamesToPathsMap,
	BuildSettingNamesToPathsMapParams,
	Pattern,
	SettingNamesToPathsMap,
	state,
	to,
} from '../../../../../src'

const subject: (_?: BuildSettingNamesToPathsMapParams) => void = buildSettingNamesToPathsMap.default

describe('build settings names to paths map', () => {
	it('maps each setting\'s name to its full path in the pattern structure, saving onto the store', () => {
		state.settings.settingNamesToPathsMap = {}
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
		expect(state.settings.settingNamesToPathsMap).toEqual(expectedSettingNamesToPathsMap)
	})
})
