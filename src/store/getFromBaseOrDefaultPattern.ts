// tslint:disable:no-any

import { state } from '../state'
import { isDefined } from '../utilities/codeUtilities'
import * as to from '../utilities/to'
import { DEFAULT_BASE_PATTERN } from './defaults'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import { settingNamesToPathsMap } from './settingNamesToPathsMap'
import { SettingsNamesToTypesMap, SettingsPath } from './types'

const getFromBaseOrDefaultPattern: SettingsNamesToTypesMap = (settingName: any) => {
	const baseSettingsPath: SettingsPath = settingNamesToPathsMap[ settingName ] || to.SettingsPath([])
	const settingsPath: SettingsPath = to.SettingsPath(baseSettingsPath.concat([ settingName ]))

	let childSetting: { [ index: string ]: any } = state.mainHoundstooth.basePattern

	for (const settingsStep of settingsPath) {
		if (!isDefined(childSetting[ settingsStep ])) {
			return getSettingOrCreatePath({
				settings: DEFAULT_BASE_PATTERN,
				settingsPath,
			})
		}
		childSetting = childSetting[ settingsStep ]
	}

	return getSettingOrCreatePath({
		settings: state.mainHoundstooth.basePattern,
		settingsPath,
	})
}

export { getFromBaseOrDefaultPattern }
