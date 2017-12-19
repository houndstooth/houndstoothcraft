// tslint:disable:no-any no-unsafe-any

import { codeUtilities, globalWrapper } from '../../utilities'
import { formatSetting } from '../dom'
import concatFullSettingPath from './concatFullSettingPath'
import { CheckSettingForConflictParams, SettingConflictCheck, SettingsAreEqual } from './types'

const { isDefined } = codeUtilities

const checkSettingForConflict: (_: CheckSettingForConflictParams) => boolean =
	(checkSettingForConflictParams: CheckSettingForConflictParams): boolean => {
		const {
			patternName,
			setting,
			settingCheckingForConflict,
			settingName,
			settingPath,
		}: CheckSettingForConflictParams = checkSettingForConflictParams

		if (shouldWarnAboutConflict({ setting, settingCheckingForConflict })) {
			const warning: string = buildWarningMessage({
				patternName,
				setting,
				settingCheckingForConflict,
				settingName,
				settingPath,
			})
			globalWrapper.console.warn(warning)

			return true
		}

		return false
	}

const shouldWarnAboutConflict: (_: SettingConflictCheck) => boolean =
	({ setting, settingCheckingForConflict }: SettingConflictCheck): boolean =>
		isDefined(setting) && !settingsAreEqual(setting, settingCheckingForConflict)

const settingsAreEqual: SettingsAreEqual =
	(a: any, b: any): boolean => {
		let settingsEqual: boolean
		// tslint:disable-next-line:strict-type-predicates
		if (typeof a !== typeof b) {
			settingsEqual = false
		}

		if (typeof a === 'function') {
			settingsEqual = a.toString() === b.toString()
		}
		else if (a instanceof Array) {
			settingsEqual = a.every((aEntry: any, index: number): boolean => aEntry === b[ index ])
		}
		else {
			settingsEqual = a === b
		}

		return settingsEqual
	}

const buildWarningMessage: (_: CheckSettingForConflictParams) => string =
	(checkSettingForConflictParams: CheckSettingForConflictParams): string => {
		const {
			patternName,
			setting,
			settingCheckingForConflict,
			settingName,
			settingPath,
		} = checkSettingForConflictParams

		const formattedSetting: string = formatSetting.default(setting)
		const formattedCheckedSetting: string = formatSetting.default(settingCheckingForConflict)
		const concatenatedFullSettingsPath: string = concatFullSettingPath({
			patternName,
			settingName,
			settingPath,
		}).join('.')

		// tslint:disable-next-line:max-line-length
		return `effect would have conflicts on setting \`${concatenatedFullSettingsPath}\`: \`${formattedSetting}\` would be overridden by \`${formattedCheckedSetting}\``
	}

export default checkSettingForConflict
