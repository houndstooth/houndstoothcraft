// tslint:disable:no-any

import { DEFAULT_BASE_PATTERN } from '../../defaults'
import { state } from '../../state'
import * as to from '../../to'
import deeperPath from './deeperPath'
import shouldRecurse from './shouldRecurse'
import { BuildSettingNamesToPathsMapParams } from './types'

const buildSettingNamesToPathsMap: (_?: BuildSettingNamesToPathsMapParams) => void =
	(params?: BuildSettingNamesToPathsMapParams): void => {
		const {
			settings = DEFAULT_BASE_PATTERN,
			settingsPath = to.SettingsPath([]),
		}: BuildSettingNamesToPathsMapParams = params || {}

		Object.entries(settings).forEach(([ settingName, settingValue ]: [ string, any ]) => {
			state.settings.settingNamesToPathsMap[ settingName ] = settingsPath
			if (shouldRecurse(settingValue)) {
				buildSettingNamesToPathsMap({
					// tslint:disable-next-line:no-unsafe-any
					settings: settings[settingName],
					settingsPath: deeperPath({ settingsPath, settingName: to.SettingsStep(settingName) }),
				})
			}
		})
	}

export default buildSettingNamesToPathsMap
