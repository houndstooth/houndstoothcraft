import { SettingsPath } from './types'

type SettingPath = { ({}: { settingsPath: SettingsPath, settingName: string }): string }
const settingPath: SettingPath = ({ settingsPath, settingName }) => `${settingsPath.join('.')}.${settingName}`

export default settingPath
