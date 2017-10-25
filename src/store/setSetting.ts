import { state } from '../state'
import * as from from '../utilities/from'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import { settingsPathShortcuts } from './settingsPathShortcuts'
import { SetSetting, SettingsPath } from './types'

const setSetting: SetSetting = (settingsPathShortcut: any, value: any) => {
	const settingsPath: SettingsPath[] = settingsPathShortcuts[ settingsPathShortcut ]
	const settingName = from.SettingsStep(settingsPath.slice(-1)[0])
	const pathToParentSetting = settingsPath.slice(0, -1)

	const parentSetting = getSettingOrCreatePath({
		settings: state.mainHoundstooth.basePattern,
		settingsPath: pathToParentSetting,
	})
	parentSetting[settingName] = value
}

export { setSetting }
