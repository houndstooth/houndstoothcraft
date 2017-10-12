import { isDefined } from '../utilities/codeUtilities'
import { console } from '../utilities/windowWrapper'
import { warn } from '../ui'
import { PropertyPath } from '../utilities/types'
import settingPath from './settingPath'

type MaybeWarnAboutConflicts = {
	({}: {
		warnAboutConflicts: boolean,
		settingsPath: PropertyPath,
		settingName: string,
		existingSetting: any,
		overridingSetting: any,
	}): void,
}
const maybeWarnAboutConflicts: MaybeWarnAboutConflicts = params => {
	const { warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting } = params
	if (shouldWarnAboutConflicts({ warnAboutConflicts, existingSetting, overridingSetting })) {
		const warning = buildWarningMessage({ settingsPath, settingName, existingSetting, overridingSetting })
		console.warn(warning)
		warn(warning)
	}
}

type ShouldWarnAboutConflicts = { ({}: { warnAboutConflicts, existingSetting, overridingSetting }): boolean }
const shouldWarnAboutConflicts: ShouldWarnAboutConflicts = params => {
	const { warnAboutConflicts, existingSetting, overridingSetting } = params
	return warnAboutConflicts && isDefined(existingSetting) && !settingsAreEqual(existingSetting, overridingSetting)
}

const settingsAreEqual: { (a: any, b: any): boolean } = (a, b) => {
	if (typeof a === 'function') {
		if (typeof b === 'function') {
			return a.toString() === b.toString()
		}
		else {
			return false
		}
	}
	else if (a instanceof Array) {
		if (b instanceof Array) {
			return a.every((aEntry, index) => aEntry === b[ index ])
		}
		else {
			return false
		}
	}
	return a === b
}

type BuildWarningMessage = {
	({}: { settingsPath: PropertyPath, settingName: string, existingSetting: any, overridingSetting: any }): string,
}
const buildWarningMessage: BuildWarningMessage = params => {
	const { settingsPath, settingName, existingSetting, overridingSetting } = params
	const formattedExistingSetting = formatSettingForWarning(existingSetting)
	const formattedOverridingSetting = formatSettingForWarning(overridingSetting)
	const fullSettingPath = settingPath({ settingsPath, settingName })
	// eslint-disable-next-line max-len
	return `some effects have conflicts on setting \`${fullSettingPath}\`: \`${formattedExistingSetting}\` was overridden by \`${formattedOverridingSetting}\``
}

const formatSettingForWarning: { (setting: any): string } = setting => {
	if (typeof setting === 'function') {
		return setting.toString().replace(/\n/g, '').replace(/\t/g, '')
	}
	else if (typeof setting === 'string') {
		return setting
	}
	return JSON.stringify(setting)
}

export default maybeWarnAboutConflicts
