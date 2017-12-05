// tslint:disable:no-any no-unsafe-any

import { SetSetting } from '../../pattern'
import { state } from '../../state'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import { SettingsPath } from './types'

const setSetting: SetSetting =
	(settingName: any, value: any): void => {
		const baseSettingsPath: SettingsPath = state.settings.settingNamesToPathsMap[ settingName ]

		const parentSetting: any = getPatternSettingOrCreatePath({
			pattern: state.settings.currentPattern,
			settingsPath: baseSettingsPath,
		})
		parentSetting[ settingName ] = value
	}

export default setSetting
