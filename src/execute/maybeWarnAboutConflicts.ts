import { SettingsPath } from '../store'
import { warn } from '../ui'
import { isDefined } from '../utilities/codeUtilities'
import { console } from '../utilities/windowWrapper'
import { settingPath } from './settingPath'

const maybeWarnAboutConflicts: (_: {
	existingSetting: any,
	overridingSetting: any,
	settingName: string,
	settingsPath: SettingsPath,
	warnAboutConflicts: boolean,
}) => void = ({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting }) => {
	if (shouldWarnAboutConflicts({ warnAboutConflicts, existingSetting, overridingSetting })) {
		const warning = buildWarningMessage({ settingsPath, settingName, existingSetting, overridingSetting })
		console.warn(warning)
		warn(warning)
	}
}

const shouldWarnAboutConflicts: (_: {
	existingSetting, overridingSetting, warnAboutConflicts,
}) => boolean = ({ existingSetting, overridingSetting, warnAboutConflicts }) =>
	warnAboutConflicts && isDefined(existingSetting) && !settingsAreEqual(existingSetting, overridingSetting)

const settingsAreEqual: (a: any, b: any) => boolean = (a, b) => {
	let settingsEqual
	if (typeof a === 'function') {
		settingsEqual = typeof b === 'function' ? a.toString() === b.toString() : false
	}
	else if (a instanceof Array) {
		settingsEqual = b instanceof Array ? a.every((aEntry, index) => aEntry === b[ index ]) : false
	}
	else {
		settingsEqual = a === b
	}

	return settingsEqual
}

const buildWarningMessage: (_: {
	existingSetting: any,
	overridingSetting: any,
	settingName: string,
	settingsPath: SettingsPath,
}) => string = ({ existingSetting, overridingSetting, settingName, settingsPath }) => {
	const formattedExistingSetting = formatSettingForWarning(existingSetting)
	const formattedOverridingSetting = formatSettingForWarning(overridingSetting)
	const fullSettingPath = settingPath({ settingsPath, settingName })

	// tslint:disable-next-line:max-line-length
	return `some effects have conflicts on setting \`${fullSettingPath}\`: \`${formattedExistingSetting}\` was overridden by \`${formattedOverridingSetting}\``
}

const formatSettingForWarning: (setting: any) => string = setting => {
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
