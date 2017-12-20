import { to } from '../../../utilities'
import { SettingPath } from '../types'
import { FullSettingPath } from './types'

const concatFullSettingPath: (_: FullSettingPath) => SettingPath =
	({ patternName, settingPath, settingName }: FullSettingPath): SettingPath =>
		to.SettingPath([ patternName ].concat(settingPath).concat([ settingName ]))

export default concatFullSettingPath
