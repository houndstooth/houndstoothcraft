import { state } from '../state'
import { accessChildPropertyOrCreatePath, isDefined } from '../utilities/codeUtilities'
import { Setting, SettingsPath } from './types'
import { DEFAULT_BASE_PATTERN } from './defaults'
import * as settingsPaths from './settingsPaths'
import { SettingsPathShortcut } from './SettingsPathShortcut'

const getSetting: (settingsPathShortcut: SettingsPathShortcut) => Setting = settingsPathShortcut => {
	const settingsPath: SettingsPath = settingsPaths[settingsPathShortcut]

	let childSetting = state.mainHoundstooth.basePattern

	for (const settingsStep of settingsPath) {
		if (!isDefined(childSetting && childSetting[ settingsStep ])) {
			return accessChildPropertyOrCreatePath({
				objectWithProperties: DEFAULT_BASE_PATTERN,
				settingsPath,
			})
		}
		childSetting = childSetting && childSetting[ settingsStep ]
	}

	return accessChildPropertyOrCreatePath({
		objectWithProperties: state.mainHoundstooth.basePattern,
		settingsPath,
	})
}

export { getSetting }
