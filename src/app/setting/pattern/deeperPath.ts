import { to } from '../../../utilities'
import { SettingPath } from '../types'
import { DeeperPathParams } from './types'

const deeperPath: (_: DeeperPathParams) => SettingPath =
	({ settingName, settingPath }: DeeperPathParams): SettingPath => {
		const path: SettingPath = to.SettingPath(settingPath.slice())
		path.push(settingName)

		return path
	}

export default deeperPath
