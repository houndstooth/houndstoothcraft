// tslint:disable:no-any no-unsafe-any

import { deeperPath, getPatternSettingOrCreatePath, getSettingsPath, SettingsPath } from '../app'
import { DEFAULT_BASE_PATTERN } from '../defaults'
import { codeUtilities, to } from '../utilities'
import { PatternState, SettingsNamesToTypesMap } from './types'

const patternState: PatternState = {}

const get: SettingsNamesToTypesMap =
	(settingName?: any): any => {
		if (!settingName) {
			return patternState
		}

		const settingsPath: SettingsPath = getSettingsPath.default({ settingName })
		const deeperSettingsPath: SettingsPath = deeperPath.default({
			settingName: to.SettingsStep(settingName),
			settingsPath,
		})

		let childSetting: { [ index: string ]: any } = patternState

		for (const settingsStep of deeperSettingsPath) {
			if (!codeUtilities.isDefined(childSetting[ settingsStep ])) {
				return getPatternSettingOrCreatePath.default({
					pattern: DEFAULT_BASE_PATTERN,
					settingsPath: deeperSettingsPath,
				})
			}
			childSetting = childSetting[ settingsStep ]
		}

		return getPatternSettingOrCreatePath.default({
			pattern: patternState,
			settingsPath: deeperSettingsPath,
		})
	}

export { get }
