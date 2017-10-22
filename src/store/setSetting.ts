import { state } from '../state'
import * as from from '../utilities/from'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import * as settingsPaths from './settingsPaths'
import { AllSettingsPathShortcuts } from './types'
import { SettingsPath } from './types/SettingsPath'

const setSetting: (shortcut: AllSettingsPathShortcuts, value: any) => void = (shortcut, value) => {
	const settingsPath: SettingsPath = settingsPaths[ shortcut ]
	const settingName = from.SettingsStep(settingsPath.slice(-1)[0])
	const pathToParentSetting = settingsPath.slice(0, -1)

	const parent = getSettingOrCreatePath({
		settings: state.mainHoundstooth.basePattern,
		settingsPath: pathToParentSetting,
	})
	parent[settingName] = value
}

export { setSetting }
