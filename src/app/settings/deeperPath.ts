import { to } from '../../utilities'
import { SettingPath, SettingPathAndName } from './types'

const deeperPath: (_: SettingPathAndName) => SettingPath =
	({ settingName, settingPath }: SettingPathAndName): SettingPath => {
		const path: SettingPath = to.SettingPath(settingPath.slice())
		path.push(settingName)

		return path
	}

export default deeperPath
