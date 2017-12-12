import { DEFAULT_PATTERN_STATE, PatternState, SettingsNamesToTypesMap } from '../../pattern'
import { SettingsPath } from './types'
import getSettingsPath from './getSettingsPath'
import deeperPath from './deeperPath'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import { codeUtilities, to } from '../../utilities'

const getFromPattern: SettingsNamesToTypesMap =
	(pattern: PatternState, settingName?: any): any => {
		if (!settingName) {
			return pattern
		}

		const settingsPath: SettingsPath = getSettingsPath({ settingName })
		const deeperSettingsPath: SettingsPath = deeperPath({
			settingName: to.SettingsStep(settingName),
			settingsPath,
		})

		let childSetting: { [ index: string ]: any } = pattern

		for (const settingsStep of deeperSettingsPath) {
			if (!codeUtilities.isDefined(childSetting[ settingsStep ])) {
				return getPatternSettingOrCreatePath({
					pattern: DEFAULT_PATTERN_STATE,
					settingsPath: deeperSettingsPath,
				})
			}
			childSetting = childSetting[ settingsStep ]
		}

		return getPatternSettingOrCreatePath({
			pattern,
			settingsPath: deeperSettingsPath,
		})
	}

export default getFromPattern
