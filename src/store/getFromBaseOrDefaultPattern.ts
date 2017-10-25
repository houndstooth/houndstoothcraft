// tslint:disable:no-any

import { state } from '../state'
import { isDefined } from '../utilities/codeUtilities'
import { DEFAULT_BASE_PATTERN } from './defaults'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import { settingsPathShortcuts } from './settingsPathShortcuts'
import { GetFromBaseOrDefaultPattern, SettingsPath } from './types'

const getFromBaseOrDefaultPattern: GetFromBaseOrDefaultPattern = (settingsPathShortcut: any) => {
	const settingsPath: SettingsPath[] = settingsPathShortcuts[ settingsPathShortcut ]

	let childSetting: { [ index: string ]: any } = state.mainHoundstooth.basePattern

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
