// tslint:disable:no-any

import { state } from '../state'
import * as to from '../utilities/to'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import { settingNamesToPathsMap } from './settingNamesToPathsMap'
import { SetSetting, SettingsPath } from './types'

const setSetting: SetSetting = (settingName: any, value: any) => {
	const settingsPath: SettingsPath = settingNamesToPathsMap[ settingName ]
	const pathToParentSetting: SettingsPath = to.SettingsPath(settingsPath.slice(0, -1))

	const parentSetting: any = getSettingOrCreatePath({
		settings: state.mainHoundstooth.basePattern,
		settingsPath: pathToParentSetting,
	})
	parentSetting[settingName] = value
}

export { setSetting }
