import { SettingsStep } from '../store'

const settingPath: (_: {
	settingName: SettingsStep, settingsPath: SettingsStep[],
}) => string = ({ settingName, settingsPath }) =>
	`${settingsPath.join('.')}.${settingName}`

export { settingPath }
