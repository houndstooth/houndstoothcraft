import * as to from '../../to'
import { FullSettingsPath } from '../execute'
import { SettingsPath } from './types'

const deeperPath: (_: FullSettingsPath) => SettingsPath =
	({ settingName, settingsPath }: FullSettingsPath): SettingsPath => {
		const path: SettingsPath = to.SettingsPath(settingsPath.slice())
		path.push(settingName)

		return to.SettingsPath(path)
	}

export { deeperPath }
