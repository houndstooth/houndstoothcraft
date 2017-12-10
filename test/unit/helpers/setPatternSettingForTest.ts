// tslint:disable:no-any no-unsafe-any

import { appState, getPatternSettingOrCreatePath, patternState, SettingsPath } from '../../../src'
import { SetPatternSettingForTest } from './types'

const setPatternSettingForTest: SetPatternSettingForTest =
	(settingName: any, value: any): void => {
		const baseSettingsPath: SettingsPath = appState.settings.settingNamesToPathsMap[ settingName ]

		const parentSetting: any = getPatternSettingOrCreatePath.default({
			pattern: patternState.get(),
			settingsPath: baseSettingsPath,
		})
		parentSetting[ settingName ] = value
	}

export default setPatternSettingForTest
