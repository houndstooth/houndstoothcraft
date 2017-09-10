import codeUtilities from '../utilities/codeUtilities'
import settingPath from './settingPath'
import consoleWrapper from '../utilities/consoleWrapper'
import controls from '../controls'

export default ({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting }) => {
	if (shouldWarnAboutConflicts({ warnAboutConflicts, existingSetting, overridingSetting })) {
		const warning = buildWarningMessage({ settingsPath, settingName, existingSetting, overridingSetting })
		consoleWrapper.warn(warning)
		controls.warn(warning)
	}
}

const shouldWarnAboutConflicts = ({ warnAboutConflicts, existingSetting, overridingSetting }) => {
	return warnAboutConflicts && codeUtilities.isDefined(existingSetting) && !settingsAreEqual(existingSetting, overridingSetting)
}

const settingsAreEqual = (a, b) => {
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

const buildWarningMessage = ({ settingsPath, settingName, existingSetting, overridingSetting }) => {
	const formattedExistingSetting = formatSettingForWarning(existingSetting)
	const formattedOverridingSetting = formatSettingForWarning(overridingSetting)
	const fullSettingPath = settingPath(settingsPath, settingName)
	return `some effects have conflicts on setting \`${fullSettingPath}\`: \`${formattedExistingSetting}\` was overridden by \`${formattedOverridingSetting}\``
}

const formatSettingForWarning = setting => {
	if (typeof setting === 'function') {
		return setting.toString().replace(/\n/g, '').replace(/\t/g, '')
	}
	else if (setting instanceof Array) {
		return `[ ${setting.join(', ')} ]`
	}
	return setting
}
