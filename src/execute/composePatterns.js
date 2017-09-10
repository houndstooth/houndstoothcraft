import consoleWrapper from '../utilities/consoleWrapper'
import codeUtilities from '../utilities/codeUtilities'
import maybeWarnAboutConflicts from './maybeWarnAboutConflicts'
import settingPath from './settingPath'
import store from '../store'

const composePatterns = ({ patternToBeMergedOnto, patternToMerge, settingsPath = [], patternStructureChecker = store.patternStructure.PATTERN_STRUCTURE, warnAboutConflicts }) => {
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

			maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

			settingsWithSettingToBeOverridden[ settingName ] = overridingSetting
		}
	})
}

const settingIsDefinedOnPatternStructure = ({ settingsPath, settingName, patternStructureChecker: objectWithProperties }) => {
	if (codeUtilities.propertyIsDefinedOnObject({ propertyName: settingName, objectWithProperties })) return true
	consoleWrapper.error(`attempted to compose a pattern with an unrecognized setting: ${settingPath(settingsPath, settingName)}`)
}

const settingIsNotColor = setting => {
	const defined = codeUtilities.isDefined
	const { r, g, b, a } = setting
	return !(defined(r) || defined(g) || defined(b) || defined(a))
}

export default composePatterns
