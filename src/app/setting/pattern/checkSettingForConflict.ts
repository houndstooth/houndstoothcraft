// tslint:disable:no-any no-unsafe-any

import { codeUtilities, from, globalWrapper } from '../../../utilities'
import { formatSetting } from '../../dom'

import concatFullSettingPath from './concatFullSettingPath'
import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import { CheckSettingForConflictParams } from './types'

const checkSettingForConflict: (_: CheckSettingForConflictParams) => boolean =
	(checkSettingForConflictParams: CheckSettingForConflictParams): boolean => {
		if (shouldWarnAboutConflict(checkSettingForConflictParams)) {
			const warning: string = createWarningMessage(checkSettingForConflictParams)
			globalWrapper.console.warn(warning)

			return true
		}

		return false
	}

const shouldWarnAboutConflict: (_: CheckSettingForConflictParams) => boolean =
	({ settingPath, settingName, settingValue, options }: CheckSettingForConflictParams): boolean => {
		const settingValueCheckingAgainst: any = getPatternSettingOrCreatePath({
			pattern: options.patternCheckingAgainst,
			settingPath,
		})[ from.SettingStep(settingName) ]

		return codeUtilities.isDefined(settingValue) &&
			codeUtilities.isDefined(settingValueCheckingAgainst) &&
			!settingsAreEqual(settingValue, settingValueCheckingAgainst)
	}

const settingsAreEqual: (_: any, __: any) => boolean =
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
			settingsEqual = a.every((aEntry: any, index: number): boolean => settingsAreEqual(aEntry, b[ index ]))
		}
		else {
			settingsEqual = a === b
		}

		return settingsEqual
	}

const createWarningMessage: (_: CheckSettingForConflictParams) => string =
	({ patternName, settingValue, options, settingName, settingPath }: CheckSettingForConflictParams): string => {
		const formattedSetting: string = formatSetting.default(settingValue)
		const settingValueCheckingAgainst: any = getPatternSettingOrCreatePath({
			pattern: options.patternCheckingAgainst,
			settingPath,
		})[ from.SettingStep(settingName) ]
		const formattedCheckedSetting: string = formatSetting.default(settingValueCheckingAgainst)
		const concatenatedFullSettingsPath: string = concatFullSettingPath({
			patternName,
			settingName,
			settingPath,
		}).join('.')

		// tslint:disable-next-line:max-line-length
		return `effect would have conflicts on setting \`${concatenatedFullSettingsPath}\`: \`${formattedSetting}\` would be overridden by \`${formattedCheckedSetting}\``
	}

export default checkSettingForConflict
