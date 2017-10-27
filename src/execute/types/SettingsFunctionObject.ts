import { SettingsStep } from '../../store'

interface SettingsFunctionObject {
	settingName: SettingsStep,
	settingsFunction: <T>(p: T) => T,
	settingsPath: SettingsStep[]
}

export { SettingsFunctionObject }
