import { from } from '../../utilities'
import { SettingPath, SettingStep } from './types'

const formatSettingPath: (_: { settingName: SettingStep, settingPath: SettingPath }) => string =
	({ settingName, settingPath }: { settingName: SettingStep, settingPath: SettingPath }): string =>
		`${settingPath.join('.')}.${from.SettingStep(settingName)}`

export default formatSettingPath
