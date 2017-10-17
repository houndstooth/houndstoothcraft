import { Setting } from '../store'
import { warn } from '../ui'
import { isDefined } from '../utilities/codeUtilities'
import { PropertyPath } from '../utilities/types'
import { console } from '../utilities/windowWrapper'
import settingPath from './settingPath'

const maybeWarnAboutConflicts: {
	({}: {
		existingSetting: Setting,
		overridingSetting: Setting,
		settingName: string,
		settingsPath: PropertyPath,
		warnAboutConflicts: boolean,
	}): void,
} = ({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting }) => {
	if (shouldWarnAboutConflicts({ warnAboutConflicts, existingSetting, overridingSetting })) {
		const warning = buildWarningMessage({ settingsPath, settingName, existingSetting, overridingSetting })
		console.warn(warning)
		warn(warning)
	}
}

const shouldWarnAboutConflicts: {
	({}: { existingSetting, overridingSetting, warnAboutConflicts }): boolean,
} = ({ existingSetting, overridingSetting, warnAboutConflicts }) =>
	warnAboutConflicts && isDefined(existingSetting) && !settingsAreEqual(existingSetting, overridingSetting)

const settingsAreEqual: { (a: Setting, b: Setting): boolean } = (a, b) => {
	let settingsEqual
	const aDowncast = a as any
	if (typeof a === 'function') {
		settingsEqual = typeof b === 'function' ? a.toString() === b.toString() : false
	}
	else if (aDowncast instanceof Array) {
		settingsEqual = b as any instanceof Array ? aDowncast.every((aEntry, index) => aEntry === b[ index ]) : false
	}
	else {
		settingsEqual = a === b
	}

	return settingsEqual
}

const buildWarningMessage: {
	({}: {
		existingSetting: Setting,
		overridingSetting: Setting,
		settingName: string,
		settingsPath: PropertyPath,
	}): string,
} = ({ existingSetting, overridingSetting, settingName, settingsPath }) => {
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
	// tslint:disable-next-line:strict-type-predicates
	else if (typeof setting === 'string') {
		return setting
	}

	return JSON.stringify(setting)
}

export default maybeWarnAboutConflicts
