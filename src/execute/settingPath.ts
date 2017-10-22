import { SettingsPath } from '../store'

const settingPath: (_: {
	settingName: string, settingsPath: SettingsPath,
}) => string = ({ settingName, settingsPath }) =>
	`${settingsPath.join('.')}.${settingName}`

export { settingPath }
