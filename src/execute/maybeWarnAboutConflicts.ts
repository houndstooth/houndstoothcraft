import { isDefined } from '../utilities/codeUtilities'
import { console } from '../utilities/windowWrapper'
import { warn } from '../ui'
import { PropertyPath } from '../utilities/types'
import { Setting } from '../store'
import settingPath from './settingPath'

const maybeWarnAboutConflicts: {
	({}: {
		warnAboutConflicts: boolean,
		settingsPath: PropertyPath,
		settingName: string,
		existingSetting: Setting,
		overridingSetting: Setting,
	}): void,
} = ({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting }) => {
	if (shouldWarnAboutConflicts({ warnAboutConflicts, existingSetting, overridingSetting })) {
		const warning = buildWarningMessage({ settingsPath, settingName, existingSetting, overridingSetting })
		console.warn(warning)
		warn(warning)
	}
}

const shouldWarnAboutConflicts: {
	({}: { warnAboutConflicts, existingSetting, overridingSetting }): boolean,
} = ({ warnAboutConflicts, existingSetting, overridingSetting }) =>
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
		settingsPath: PropertyPath,
		settingName: string,
		existingSetting: Setting,
		overridingSetting: Setting,
	}): string,
} = ({ settingsPath, settingName, existingSetting, overridingSetting }) => {
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
