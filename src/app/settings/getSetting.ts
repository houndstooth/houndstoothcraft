// tslint:disable:no-any no-unsafe-any

import { DEFAULT_BASE_PATTERN } from '../../defaults'
import { SettingsNamesToTypesMap } from '../../pattern'
import { codeUtilities, to } from '../../utilities'
import { state } from '../state'
import deeperPath from './deeperPath'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import { SettingsPath } from './types'

const getSetting: SettingsNamesToTypesMap =
	(settingName: any): any => {
		const settingsPath: SettingsPath = state.settings.settingNamesToPathsMap[ settingName ]
		const deeperSettingsPath: SettingsPath = deeperPath({ settingsPath, settingName: to.SettingsStep(settingName) })

		let childSetting: { [ index: string ]: any } = state.settings.currentPattern

		for (const settingsStep of deeperSettingsPath) {
			if (!codeUtilities.isDefined(childSetting[ settingsStep ])) {
				return getPatternSettingOrCreatePath({
					pattern: DEFAULT_BASE_PATTERN,
					settingsPath: deeperSettingsPath,
				})
			}
			childSetting = childSetting[ settingsStep ]
		}

		return getPatternSettingOrCreatePath({
			pattern: state.settings.currentPattern,
			settingsPath: deeperSettingsPath,
		})
	}

export default getSetting
