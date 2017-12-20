import { to } from '../../../utilities'
import { FullSettingPath, SettingStep } from '../../setting'

const parseOverrideId: (_: string) => FullSettingPath =
	(id: string): FullSettingPath => {
		const fullSettingPathStrings: string[] = id.split('-')
		const settingName: SettingStep = to.SettingStep(fullSettingPathStrings.splice(-1)[ 0 ])
		const patternName: SettingStep = to.SettingStep(fullSettingPathStrings.splice(0, 1)[ 0 ])

		return { patternName, settingName, settingPath: to.SettingPath(fullSettingPathStrings) }
	}

export default parseOverrideId
