import { SettingsPath } from '../../store'

interface SettingsFunctionObject { settingName: string, settingsFunction: <T>(p: T) => T, settingsPath: SettingsPath }

export { SettingsFunctionObject }
