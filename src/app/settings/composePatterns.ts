// tslint:disable:no-any no-unsafe-any

import { to } from '../../utilities'
import deeperPath from './deeperPath'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import shouldRecurse from './shouldRecurse'
import { ComposePatternsParams } from './types'

const composePatterns: (_: ComposePatternsParams) => void =
	(composePatternsParams: ComposePatternsParams): void => {
		const {
			patternToBeMergedOnto,
			patternToMerge = {},
			settingPath = to.SettingPath([]),
		}: ComposePatternsParams = composePatternsParams

		Object.entries(patternToMerge).forEach(([ settingNameString, overridingSetting ]: [ string, any ]) => {
			if (shouldRecurse(overridingSetting)) {
				composePatterns({
					patternToBeMergedOnto,
					patternToMerge: overridingSetting,
					settingPath: deeperPath({ settingPath, settingName: to.SettingStep(settingNameString) }),
				})
			}
			else {
				getPatternSettingOrCreatePath({
					pattern: patternToBeMergedOnto,
					settingPath,
				})[ settingNameString ] = overridingSetting
			}
		})
	}

export default composePatterns
