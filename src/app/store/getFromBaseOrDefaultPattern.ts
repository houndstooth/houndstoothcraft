// tslint:disable:no-any no-unsafe-any

import { DEFAULT_BASE_PATTERN } from '../../defaults'
import { settingsNamesToPathsMap, SettingsNamesToTypesMap } from '../../pattern'
import { state } from '../../state'
import * as to from '../../to'
import { codeUtilities } from '../../utilities'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import { SettingsPath } from './types'

const getFromBaseOrDefaultPattern: SettingsNamesToTypesMap =
	(settingName: any): any => {
		const baseSettingsPath: SettingsPath = settingsNamesToPathsMap[ settingName ] || to.SettingsPath([])
		const settingsPath: SettingsPath = to.SettingsPath(baseSettingsPath.concat([ settingName ]))

		let childSetting: { [ index: string ]: any } = state.mainHoundstooth.basePattern

		for (const settingsStep of settingsPath) {
			if (!codeUtilities.isDefined(childSetting[ settingsStep ])) {
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
