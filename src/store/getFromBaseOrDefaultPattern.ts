import { state } from '../state'
import { isDefined } from '../utilities/codeUtilities'
import { DEFAULT_BASE_PATTERN } from './defaults'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import * as settingsPathShortcuts from './settingsPathShortcuts'
import { GetFromBaseOrDefaultPattern, SettingsPath } from './types'

const getFromBaseOrDefaultPattern: GetFromBaseOrDefaultPattern = settingsPathShortcut => {
	const settingsPath: SettingsPath[] = settingsPathShortcuts[ settingsPathShortcut ]

	let childSetting = state.mainHoundstooth.basePattern

	for (const settingsStep of settingsPath) {
		if (!isDefined(childSetting && childSetting[ settingsStep ])) {
			return getSettingOrCreatePath({
				settings: DEFAULT_BASE_PATTERN,
				settingsPath,
			})
		}
		childSetting = childSetting && childSetting[ settingsStep ]
	}

	return getSettingOrCreatePath({
		settings: state.mainHoundstooth.basePattern,
		settingsPath,
	})
}

export { getFromBaseOrDefaultPattern }
