import { to } from '../../utilities'
import { FullSettingPath, SettingPath } from './types'

const deeperPath: (_: FullSettingPath) => SettingPath =
	({ settingName, settingPath }: FullSettingPath): SettingPath => {
		const path: SettingPath = to.SettingPath(settingPath.slice())
		path.push(settingName)

		return path
	}

export default deeperPath
