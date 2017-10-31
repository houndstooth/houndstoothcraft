// tslint:disable:no-any no-unsafe-any

import { warn } from '../ui'
import { isDefined } from '../utilities/codeUtilities'
import { console } from '../utilities/windowWrapper'
import { settingPath } from './settingPath'
import { BuildWarningMessageParams, MaybeWarnAboutConflictsParams, ShouldWarnAboutConflictsParams } from './types'

const maybeWarnAboutConflicts: (_: MaybeWarnAboutConflictsParams) => void =
	(params: MaybeWarnAboutConflictsParams): void => {
		const {
			existingSetting,
			overridingSetting,
			settingName,
			settingsPath,
			warnAboutConflicts,
		}: MaybeWarnAboutConflictsParams = params

		if (shouldWarnAboutConflicts({ warnAboutConflicts, existingSetting, overridingSetting })) {
			const warning: string = buildWarningMessage({
				existingSetting,
				overridingSetting,
				settingName,
				settingsPath,
			})
			console.warn(warning)
			warn(warning)
		}
	}

const shouldWarnAboutConflicts: (_: ShouldWarnAboutConflictsParams) => boolean =
	({ existingSetting, overridingSetting, warnAboutConflicts }: ShouldWarnAboutConflictsParams): boolean =>
		warnAboutConflicts && isDefined(existingSetting) && !settingsAreEqual(existingSetting, overridingSetting)

const settingsAreEqual: (a: any, b: any) => boolean =
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

const buildWarningMessage: (_: BuildWarningMessageParams) => string =
	({ existingSetting, overridingSetting, settingName, settingsPath }: BuildWarningMessageParams): string => {
		const formattedExistingSetting: string = formatSettingForWarning(existingSetting)
		const formattedOverridingSetting: string = formatSettingForWarning(overridingSetting)
		const fullSettingPath: string = settingPath({ settingsPath, settingName })

		// tslint:disable-next-line:max-line-length
		return `some effects have conflicts on setting \`${fullSettingPath}\`: \`${formattedExistingSetting}\` was overridden by \`${formattedOverridingSetting}\``
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

export { maybeWarnAboutConflicts }
