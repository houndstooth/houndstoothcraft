// tslint:disable:no-any no-unsafe-any

import { state } from '../state'
import * as to from '../utilities/to'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import { settingsNamesToPathsMap } from './settingsNamesToPathsMap'
import { SetSetting, SettingsPath } from './types'

const setSetting: SetSetting =
	(settingName: any, value: any): void => {
		const baseSettingsPath: SettingsPath = settingsNamesToPathsMap[ settingName ] || to.SettingsPath([])

		const parentSetting: any = getSettingOrCreatePath({
			settings: state.mainHoundstooth.basePattern,
			settingsPath: baseSettingsPath,
		})
		parentSetting[ settingName ] = value
	}

export { setSetting }
