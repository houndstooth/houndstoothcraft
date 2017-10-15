import { isDefined } from '../utilities/codeUtilities'
import { console } from '../utilities/windowWrapper'
import { warn } from '../ui'
import { PropertyPath } from '../utilities/types'
import { Setting } from '../store'
import settingPath from './settingPath'
import set = Reflect.set

type MaybeWarnAboutConflicts = {
	({}: {
		warnAboutConflicts: boolean,
		settingsPath: PropertyPath,
		settingName: string,
		existingSetting: Setting,
		overridingSetting: Setting,
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

const settingsAreEqual: { (a: Setting, b: Setting): boolean } = (a, b) => {
	let settingsEqual
	const aAsAny = a as any
	if (typeof a === 'function') {
		settingsEqual = typeof b === 'function' ? a.toString() === b.toString() : false
	}
	else if (aAsAny instanceof Array) {
		settingsEqual = b as any instanceof Array ? aAsAny.every((aEntry, index) => aEntry === b[ index ]) : false
	}
	else {
		settingsEqual = a === b
	}

	return settingsEqual
}

type BuildWarningMessage = {
	({}: {
		settingsPath: PropertyPath,
		settingName: string,
		existingSetting: Setting,
		overridingSetting: Setting,
	}): string,
}
const buildWarningMessage: BuildWarningMessage = params => {
	const { settingsPath, settingName, existingSetting, overridingSetting } = params
	const formattedExistingSetting = formatSettingForWarning(existingSetting)
	const formattedOverridingSetting = formatSettingForWarning(overridingSetting)
	const fullSettingPath = settingPath({ settingsPath, settingName })

	// tslint:disable-next-line:max-line-length
	return `some effects have conflicts on setting \`${fullSettingPath}\`: \`${formattedExistingSetting}\` was overridden by \`${formattedOverridingSetting}\``
}

const formatSettingForWarning: { (setting: Setting): string } = setting => {
	if (typeof setting === 'function') {
		return setting.toString().replace(/\n/g, '').replace(/\t/g, '')
	}
	else if (typeof setting === 'string') {
		return setting
	}

	return JSON.stringify(setting)
}

export default maybeWarnAboutConflicts
