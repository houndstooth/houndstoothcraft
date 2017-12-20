import { from } from '../../utilities'
import { CreateOverrideTextParams } from './types'

const createOverrideText: (_: CreateOverrideTextParams) => string =
	({ maybeMark, settingName, settingPath, patternName }: CreateOverrideTextParams): string =>
		`${from.SettingStep(settingName)}${maybeMark({ settingName, settingPath, patternName })}`

export default createOverrideText
