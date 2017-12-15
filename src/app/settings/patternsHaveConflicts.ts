// tslint:disable:no-any no-unsafe-any

import { ObjectOf, to } from '../../utilities'
import checkSettingForConflict from './checkSettingForConflict'
import deeperPath from './deeperPath'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import shouldRecurse from './shouldRecurse'
import { PatternsHaveConflictsParams, SettingStep } from './types'

const patternsHaveConflicts: (_: PatternsHaveConflictsParams) => boolean =
	(params: PatternsHaveConflictsParams): boolean => {
		const {
			pattern = {},
			patternCheckingAgainst = {},
			settingPath = to.SettingPath([]),
		}: PatternsHaveConflictsParams = params

		let hasConflicts: boolean = false

		// tslint:disable-next-line:max-line-length
		Object.entries(patternCheckingAgainst).forEach(([ settingNameString, settingCheckingForConflict ]: [ string, any ]) => {
			const settingName: SettingStep = to.SettingStep(settingNameString)
			if (shouldRecurse(settingCheckingForConflict)) {
				const deeperConflicts: boolean = patternsHaveConflicts({
					pattern,
					patternCheckingAgainst: settingCheckingForConflict,
					settingPath: deeperPath({ settingPath, settingName }),
				})

				if (deeperConflicts) {
					hasConflicts = true
				}
			}
			else {
				const settingsWithSettingToBeChecked: ObjectOf<any> = getPatternSettingOrCreatePath({
					pattern,
					settingPath,
				})

				const setting: any = settingsWithSettingToBeChecked[ settingNameString ]

				const shallowConflicts: boolean = checkSettingForConflict({
					setting,
					settingCheckingForConflict,
					settingName,
					settingPath,
				})

				if (shallowConflicts) {
					hasConflicts = true
				}
			}
		})

		return hasConflicts
	}

export default patternsHaveConflicts
