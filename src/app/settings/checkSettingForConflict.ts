// tslint:disable:no-any no-unsafe-any

import { codeUtilities } from '../../utilities'
import { consoleWrapper } from '../dom'
import settingPath from './settingPath'
import { CheckSettingForConflict, SettingConflictCheck, SettingsAreEqual } from './types'

const { isDefined } = codeUtilities

const checkSettingForConflict: (_: CheckSettingForConflict) => boolean =
	(params: CheckSettingForConflict): boolean => {
		const {
			setting,
			settingCheckingForConflict,
			settingName,
			settingsPath,
		}: CheckSettingForConflict = params

		if (shouldWarnAboutConflict({ setting, settingCheckingForConflict })) {
			const warning: string = buildWarningMessage({
				setting,
				settingCheckingForConflict,
				settingName,
				settingsPath,
			})
			consoleWrapper.warn(warning)

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

const buildWarningMessage: (_: CheckSettingForConflict) => string =
	({ setting, settingCheckingForConflict, settingName, settingsPath }: CheckSettingForConflict): string => {
		const formattedSetting: string = formatSettingForWarning(setting)
		const formattedCheckedSetting: string = formatSettingForWarning(settingCheckingForConflict)
		const fullSettingPath: string = settingPath({ settingsPath, settingName })

		// tslint:disable-next-line:max-line-length
		return `effect would have conflicts on setting \`${fullSettingPath}\`: \`${formattedSetting}\` would be overridden by \`${formattedCheckedSetting}\``
	}

const formatSettingForWarning: (setting: any) => string =
	(setting: any): string => {
		if (typeof setting === 'function') {
			return setting.toString().replace(/\n/g, '').replace(/\t/g, '')
		}
		// tslint:disable-next-line:strict-type-predicates
		else if (typeof setting === 'string') {
			return setting
		}

		return JSON.stringify(setting)
	}

export default checkSettingForConflict
