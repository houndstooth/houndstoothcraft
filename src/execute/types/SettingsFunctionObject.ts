import { SettingsPath } from '../../store'

interface SettingsFunctionObject {
	settingName: SettingsPath,
	settingsFunction: <T>(p: T) => T,
	settingsPath: SettingsPath[]
}

export { SettingsFunctionObject }
