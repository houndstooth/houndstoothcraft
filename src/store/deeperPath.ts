import * as to from '../utilities/to'
import { SettingsStep } from './types'

const deeperPath: (_: {
	settingName: SettingsStep, settingsPath: SettingsStep[],
}) => SettingsStep[] = ({ settingName, settingsPath }) => {
	const path = settingsPath.slice()
	path.push(settingName)

	return to.SettingsPath(path)
}

export { deeperPath }
