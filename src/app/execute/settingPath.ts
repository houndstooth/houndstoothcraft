import { SettingsPath, SettingsStep } from '../settings'

const settingPath: (_: { settingName: SettingsStep, settingsPath: SettingsPath }) => string =
	({ settingName, settingsPath }: { settingName: SettingsStep, settingsPath: SettingsPath }): string =>
		`${settingsPath.join('.')}.${settingName}`

export default settingPath
