// tslint:disable:no-any no-unsafe-any

import * as to from '../../to'
import deeperPath from './deeperPath'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import shouldRecurse from './shouldRecurse'
import { ComposePatternsParams } from './types'

const composePatterns: (_: ComposePatternsParams) => void =
	(params: ComposePatternsParams): void => {
		const {
			patternToBeMergedOnto,
			patternToMerge = {},
			settingsPath = to.SettingsPath([]),
		}: ComposePatternsParams = params

		Object.entries(patternToMerge).forEach(([ settingName, overridingSetting ]: [ string, any ]) => {
			if (shouldRecurse(overridingSetting)) {
				composePatterns({
					patternToBeMergedOnto,
					patternToMerge: overridingSetting,
					settingsPath: deeperPath({ settingsPath, settingName: to.SettingsStep(settingName) }),
				})
			}
			else {
				getPatternSettingOrCreatePath({
					pattern: patternToBeMergedOnto,
					settingsPath,
				})[ settingName ] = overridingSetting
			}
		})
	}

export default composePatterns
