// tslint:disable:no-any no-unsafe-any

import * as to from '../../to'
import checkSettingForConflict from './checkSettingForConflict'
import deeperPath from './deeperPath'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import shouldRecurse from './shouldRecurse'
import { PatternsHaveConflictsParams } from './types'

const patternsHaveConflicts: (_: PatternsHaveConflictsParams) => boolean =
	(params: PatternsHaveConflictsParams): boolean => {
		const {
			pattern = {},
			patternCheckingAgainst = {},
			settingsPath = to.SettingsPath([]),
		}: PatternsHaveConflictsParams = params

		let hasConflicts: boolean = false

		Object.entries(patternCheckingAgainst).forEach(([ settingName, settingCheckingForConflict ]: [ string, any ]) => {
			if (shouldRecurse(settingCheckingForConflict)) {
				const deeperConflicts: boolean = patternsHaveConflicts({
					pattern,
					patternCheckingAgainst: settingCheckingForConflict,
					settingsPath: deeperPath({ settingsPath, settingName: to.SettingsStep(settingName) }),
				})

				if (deeperConflicts) {
					hasConflicts = true
				}
			}
			else {
				const settingsWithSettingToBeChecked: { [_: string]: any } = getPatternSettingOrCreatePath({
					pattern,
					settingsPath,
				})

				const setting: any = settingsWithSettingToBeChecked[ settingName ]

				const shallowConflicts: boolean = checkSettingForConflict({
					setting,
					settingCheckingForConflict,
					settingName: to.SettingsStep(settingName),
					settingsPath,
				})

				if (shallowConflicts) {
					hasConflicts = true
				}
			}
		})

		return hasConflicts
	}

export default patternsHaveConflicts
