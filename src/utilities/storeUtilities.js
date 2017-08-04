import consoleWrapper from '../application/consoleWrapper'
import codeUtilities from './codeUtilities'
import patternStructure from '../store/patternStructure'
import houndstoothStructure from '../store/houndstoothStructure'
import warn from '../application/warn'

const prepareFunctionsPerSetting = ({ settingsFunctions, settingsPath = [], functionsArray = [] }) => {
	Object.entries(settingsFunctions).forEach(([ settingName, maybeSettingFunction ]) => {
		if (typeof maybeSettingFunction === 'function') {
			functionsArray.push({ settingFunctionItself: maybeSettingFunction, settingsPath, settingName })
		}
		else if (typeof maybeSettingFunction === 'object' && !(maybeSettingFunction instanceof Array)) {
			prepareFunctionsPerSetting({
				settingsFunctions: maybeSettingFunction,
				settingsPath: codeUtilities.deeperPath({ propertyPath: settingsPath, propertyName: settingName }),
				functionsArray,
			})
		}
		else {
			consoleWrapper.error(`These settings should map onto basePattern settings, and be functions to call for them each animation / iteration frame. However, you have provided a non-function ${maybeSettingFunction} at path ${settingsPath} ${settingName}`)
		}
	})
	return functionsArray
}

const composePatterns = ({ patternToBeMergedOnto, patternToMerge, settingsPath = [], patternStructureChecker = patternStructure.PATTERN_STRUCTURE, warnAboutConflicts }) => {
	if (!patternToMerge) return
	Object.entries(patternToMerge).forEach(([ settingName, overridingSetting ]) => {
		if (!settingIsDefinedOnPatternStructure({ settingName, settingsPath, patternStructureChecker })) return
		const deeperPatternStructureChecker = patternStructureChecker[ settingName ]

		if (overridingSetting && typeof overridingSetting === 'object' && !overridingSetting.length) {
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
				const warningMessage = `some effects have conflicts on setting: ${settingPath(settingsPath, settingName)}`
				consoleWrapper.warn(warningMessage)
				warn(warningMessage)
			}

			settingsWithSettingToBeOverridden[ settingName ] = overridingSetting
		}
	})
}

const settingPath = (settingsPath, settingName) => `${settingsPath.join('.')}.${settingName}`

const shouldWarnAboutConflicts = ({ warnAboutConflicts, existingSetting, overridingSetting }) => {
	return warnAboutConflicts && codeUtilities.isDefined(existingSetting) && existingSetting !== overridingSetting
}

const settingIsDefinedOnPatternStructure = ({ settingsPath, settingName, patternStructureChecker: objectWithProperties }) => {
	if (codeUtilities.propertyIsDefinedOnObject({ propertyName: settingName, objectWithProperties })) return true
	consoleWrapper.error(`attempted to compose a pattern with an unrecognized setting: ${settingPath(settingsPath, settingName)}`)
}

const houndstoothHasOnlyRecognizedPatterns = houndstooth => {
	return Object.keys(houndstooth).every(patternName => {
		if (!Object.keys(houndstoothStructure.HOUNDSTOOTH_STRUCTURE).includes(patternName)) {
			consoleWrapper.error(`attempted to compose a houndstooth with an unrecognized pattern: ${patternName}`)
			return false
		}
		return true
	})
}

export default {
	prepareFunctionsPerSetting,
	composePatterns,
	houndstoothHasOnlyRecognizedPatterns,
}
