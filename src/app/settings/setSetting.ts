// tslint:disable:no-any no-unsafe-any

import { SetSetting, settingsNamesToPathsMap } from '../../pattern'
import { state } from '../../state'
import * as to from '../../to'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import { SettingsPath } from './types'

const setSetting: SetSetting =
	(settingName: any, value: any): void => {
		const baseSettingsPath: SettingsPath = settingsNamesToPathsMap[ settingName ] || to.SettingsPath([])

		const parentSetting: any = getPatternSettingOrCreatePath({
			pattern: state.settings.currentPattern,
			settingsPath: baseSettingsPath,
		})
		parentSetting[ settingName ] = value
	}

export default setSetting
