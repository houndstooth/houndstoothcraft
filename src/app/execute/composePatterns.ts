// tslint:disable:no-any no-unsafe-any

import * as to from '../../to'
import { deeperPath, getPatternSettingOrCreatePath, shouldRecurse } from '../store'
import { ComposePatternsParams } from './types'

const composePatterns: (_: ComposePatternsParams) => void =
	(params: ComposePatternsParams): void => {
		const {
			patternToBeMergedOnto,
			patternToMerge = {},
			settingsPath = to.SettingsPath([]),
		}: ComposePatternsParams = params

		Object.entries(patternToMerge).forEach(([ settingName, overridingSetting ]: [ string, any ]) => {
			if (shouldRecurse.default(overridingSetting)) {
				composePatterns({
					patternToBeMergedOnto,
					patternToMerge: overridingSetting,
					settingsPath: deeperPath.default({ settingsPath, settingName: to.SettingsStep(settingName) }),
				})
			}
			else {
				getPatternSettingOrCreatePath.default({
					pattern: patternToBeMergedOnto,
					settingsPath,
				})[ settingName ] = overridingSetting
			}
		})
	}

export default composePatterns
