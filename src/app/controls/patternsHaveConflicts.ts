// tslint:disable:no-any no-unsafe-any

import * as to from '../../to'
import { deeperPath, getPatternSettingOrCreatePath, shouldRecurse } from '../settings'
import checkSettingForConflict from './checkSettingForConflict'
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
			if (shouldRecurse.default(settingCheckingForConflict)) {
				const deeperConflicts: boolean = patternsHaveConflicts({
					pattern,
					patternCheckingAgainst: settingCheckingForConflict,
					settingsPath: deeperPath.default({ settingsPath, settingName: to.SettingsStep(settingName) }),
				})

				if (deeperConflicts) {
					hasConflicts = true
				}
			}
			else {
				const settingsWithSettingToBeChecked: { [_: string]: any } = getPatternSettingOrCreatePath.default({
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
