// tslint:disable:no-any no-unsafe-any

import { appState, getPatternSettingOrCreatePath, patternState, SettingsPath } from '../../../src'
import { SetPatternStateForTest } from './types'

const setPatternStateForTest: SetPatternStateForTest =
	(settingName: any, value: any): void => {
		const baseSettingsPath: SettingsPath = appState.settings.settingNamesToPathsMap[ settingName ]

		const parentSetting: any = getPatternSettingOrCreatePath.default({
			pattern: patternState.patternState,
			settingsPath: baseSettingsPath,
		})
		parentSetting[ settingName ] = value
	}

export default setPatternStateForTest
