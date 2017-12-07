// tslint:disable:no-any no-unsafe-any

import { DEFAULT_BASE_PATTERN } from '../../defaults'
import { patternState, SettingsNamesToTypesMap } from '../../pattern'
import { codeUtilities, to } from '../../utilities'
import { appState } from '../appState'
import deeperPath from './deeperPath'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import { SettingsPath } from './types'

const getSetting: SettingsNamesToTypesMap =
	(settingName: any): any => {
		const settingsPath: SettingsPath = appState.settings.settingNamesToPathsMap[ settingName ]
		const deeperSettingsPath: SettingsPath = deeperPath({ settingsPath, settingName: to.SettingsStep(settingName) })

		let childSetting: { [ index: string ]: any } = patternState

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
			pattern: patternState,
			settingsPath: deeperSettingsPath,
		})
	}

export default getSetting
