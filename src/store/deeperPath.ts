import * as to from '../utilities/to'
import { SettingsPath } from './types'

const deeperPath: (_: {
	settingName: SettingsPath, settingsPath: SettingsPath[],
}) => SettingsPath[] = ({ settingName, settingsPath }) => {
	const path = settingsPath.slice()
	path.push(settingName)

	return to.SettingsPath(path)
}

export { deeperPath }
