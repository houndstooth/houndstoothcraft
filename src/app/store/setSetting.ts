// tslint:disable:no-any no-unsafe-any

import { SetSetting, settingsNamesToPathsMap } from '../../pattern'
import { state } from '../../state'
import * as to from '../../to'
import { main as getSettingOrCreatePath } from './getSettingOrCreatePath'
import { SettingsPath } from './types'

const setSetting: SetSetting =
	(settingName: any, value: any): void => {
		const baseSettingsPath: SettingsPath = settingsNamesToPathsMap[ settingName ] || to.SettingsPath([])

		const parentSetting: any = getSettingOrCreatePath({
			settings: state.mainHoundstooth.basePattern,
			settingsPath: baseSettingsPath,
		})
		parentSetting[ settingName ] = value
	}

export { setSetting as main }
