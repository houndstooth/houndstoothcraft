import { SettingsPath } from '../store'

const settingPath: (_: {
	settingName: SettingsPath, settingsPath: SettingsPath[],
}) => string = ({ settingName, settingsPath }) =>
	`${settingsPath.join('.')}.${settingName}`

export { settingPath }
