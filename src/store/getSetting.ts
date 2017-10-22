import { state } from '../state'
import { accessChildPropertyOrCreatePath, isDefined } from '../utilities/codeUtilities'
import { PropertyPath } from '../utilities/types'
import { Setting } from './'
import { DEFAULT_BASE_PATTERN } from './defaults'
import * as settingsPaths from './settingsPaths'
import { SettingsPathShortcut } from './SettingsPathShortcut'

const getSetting: (settingsPathShortcut: SettingsPathShortcut) => Setting = settingsPathShortcut => {
	const settingsPath: PropertyPath = settingsPaths[settingsPathShortcut]

	let childSetting = state.mainHoundstooth.basePattern

	for (const pathStep of settingsPath) {
		if (!isDefined(childSetting && childSetting[ pathStep ])) {
			return accessChildPropertyOrCreatePath({
				objectWithProperties: DEFAULT_BASE_PATTERN,
				propertyPath: settingsPath,
			})
		}
		childSetting = childSetting && childSetting[ pathStep ]
	}

	return accessChildPropertyOrCreatePath({
		objectWithProperties: state.mainHoundstooth.basePattern,
		propertyPath: settingsPath,
	})
}

export { getSetting }
