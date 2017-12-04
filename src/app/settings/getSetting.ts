// tslint:disable:no-any no-unsafe-any

import { DEFAULT_BASE_PATTERN } from '../../defaults'
import { settingsNamesToPathsMap, SettingsNamesToTypesMap } from '../../pattern'
import { state } from '../../state'
import * as to from '../../to'
import { codeUtilities } from '../../utilities'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import { SettingsPath } from './types'

const getSetting: SettingsNamesToTypesMap =
	(settingName: any): any => {
		const baseSettingsPath: SettingsPath = settingsNamesToPathsMap[ settingName ] || to.SettingsPath([])
		const settingsPath: SettingsPath = to.SettingsPath(baseSettingsPath.concat([ settingName ]))

		let childSetting: { [ index: string ]: any } = state.settings.currentPattern

		for (const settingsStep of settingsPath) {
			if (!codeUtilities.isDefined(childSetting[ settingsStep ])) {
				return getPatternSettingOrCreatePath({
					pattern: DEFAULT_BASE_PATTERN,
					settingsPath,
				})
			}
			childSetting = childSetting[ settingsStep ]
		}

		return getPatternSettingOrCreatePath({
			pattern: state.settings.currentPattern,
			settingsPath,
		})
	}

export default getSetting
