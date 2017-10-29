import { SettingsPath, SettingsStep } from '../store'

const settingPath: (_: {
	settingName: SettingsStep, settingsPath: SettingsPath,
}) => string = ({ settingName, settingsPath }) =>
	`${settingsPath.join('.')}.${settingName}`

export { settingPath }
