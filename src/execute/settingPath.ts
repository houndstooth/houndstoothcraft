type SettingPath = { ({}: { settingsPath: string[], settingName: string }): string }
const settingPath: SettingPath = ({ settingsPath, settingName }) => `${settingsPath.join('.')}.${settingName}`

export default settingPath
