// tslint:disable:no-any no-unsafe-any

import { patternState, SetSetting } from '../../pattern'
import { appState } from '../appState'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import { SettingsPath } from './types'

const setSetting: SetSetting =
	(settingName: any, value: any): void => {
		const baseSettingsPath: SettingsPath = appState.settings.settingNamesToPathsMap[ settingName ]

		const parentSetting: any = getPatternSettingOrCreatePath({
			pattern: patternState,
			settingsPath: baseSettingsPath,
		})
		parentSetting[ settingName ] = value
	}

export default setSetting
