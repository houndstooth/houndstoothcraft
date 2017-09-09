import consoleWrapper from '../utilities/consoleWrapper'
import codeUtilities from '../utilities/codeUtilities'
import patternStructure from '../store/patternStructure'
import warn from '../controls/warn'

const composePatterns = ({ patternToBeMergedOnto, patternToMerge, settingsPath = [], patternStructureChecker = patternStructure.PATTERN_STRUCTURE, warnAboutConflicts }) => {
	if (!patternToMerge) return
	Object.entries(patternToMerge).forEach(([ settingName, overridingSetting ]) => {
		if (!settingIsDefinedOnPatternStructure({ settingName, settingsPath, patternStructureChecker })) return
		const deeperPatternStructureChecker = patternStructureChecker[ settingName ]

		if (overridingSetting && typeof overridingSetting === 'object' && !overridingSetting.length && settingIsNotColor(overridingSetting)) {
			composePatterns({
				patternToBeMergedOnto,
				patternToMerge: overridingSetting,
				settingsPath: codeUtilities.deeperPath({ propertyPath: settingsPath, propertyName: settingName }),
				patternStructureChecker: deeperPatternStructureChecker,
				warnAboutConflicts,
			})
		}
		else {
			let settingsWithSettingToBeOverridden = codeUtilities.accessChildPropertyOrCreatePath({
				objectWithProperties: patternToBeMergedOnto,
				propertyPath: settingsPath,
			})

			const existingSetting = settingsWithSettingToBeOverridden[ settingName ]
			if (shouldWarnAboutConflicts({ warnAboutConflicts, existingSetting, overridingSetting })) {
				const warning = buildWarningMessage({ settingsPath, settingName, existingSetting, overridingSetting })
				consoleWrapper.warn(warning)
				warn(warning)
			}

			settingsWithSettingToBeOverridden[ settingName ] = overridingSetting
		}
	})
}

const shouldWarnAboutConflicts = ({ warnAboutConflicts, existingSetting, overridingSetting }) => {
	return warnAboutConflicts && codeUtilities.isDefined(existingSetting) && !settingsAreEqual(existingSetting, overridingSetting)
}

const settingIsDefinedOnPatternStructure = ({ settingsPath, settingName, patternStructureChecker: objectWithProperties }) => {
	if (codeUtilities.propertyIsDefinedOnObject({ propertyName: settingName, objectWithProperties })) return true
	consoleWrapper.error(`attempted to compose a pattern with an unrecognized setting: ${settingPath(settingsPath, settingName)}`)
}

const buildWarningMessage = ({ settingsPath, settingName, existingSetting, overridingSetting }) => {
	const formattedExistingSetting = formatSettingForWarning(existingSetting)
	const formattedOverridingSetting = formatSettingForWarning(overridingSetting)
	const fullSettingPath = settingPath(settingsPath, settingName)
	return `some effects have conflicts on setting \`${fullSettingPath}\`: \`${formattedExistingSetting}\` was overridden by \`${formattedOverridingSetting}\``
}

const settingIsNotColor = setting => {
	const defined = codeUtilities.isDefined
	const { r, g, b, a } = setting
	return !(defined(r) || defined(g) || defined(b) || defined(a))
}

const settingPath = (settingsPath, settingName) => `${settingsPath.join('.')}.${settingName}`

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

const formatSettingForWarning = setting => {
	if (typeof setting === 'function') {
		return setting.toString().replace(/\n/g, '').replace(/\t/g, '')
	}
	else if (setting instanceof Array) {
		return `[ ${setting.join(', ')} ]`
	}
	return setting
}

export default composePatterns
