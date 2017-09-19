import consoleWrapper from '../utilities/consoleWrapper'
import { accessChildPropertyOrCreatePath, deeperPath, isDefined, propertyIsDefinedOnObject } from '../utilities/codeUtilities'
import maybeWarnAboutConflicts from './maybeWarnAboutConflicts'
import settingPath from './settingPath'
import { patternStructure } from '../store'

const composePatterns = ({ patternToBeMergedOnto, patternToMerge, settingsPath = [], patternStructureChecker = patternStructure.PATTERN_STRUCTURE, warnAboutConflicts }) => {
	if (!patternToMerge) return
	Object.entries(patternToMerge).forEach(([ settingName, overridingSetting ]) => {
		if (!settingIsDefinedOnPatternStructure({ settingName, settingsPath, patternStructureChecker })) return
		const deeperPatternStructureChecker = patternStructureChecker[ settingName ]

		if (overridingSetting && typeof overridingSetting === 'object' && !overridingSetting.length && settingIsNotColor(overridingSetting)) {
			composePatterns({
				patternToBeMergedOnto,
				patternToMerge: overridingSetting,
				settingsPath: deeperPath({ propertyPath: settingsPath, propertyName: settingName }),
				patternStructureChecker: deeperPatternStructureChecker,
				warnAboutConflicts,
			})
		}
		else {
			let settingsWithSettingToBeOverridden = accessChildPropertyOrCreatePath({
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
	if (propertyIsDefinedOnObject({ propertyName: settingName, objectWithProperties })) return true
	consoleWrapper.error(`attempted to compose a pattern with an unrecognized setting: ${settingPath(settingsPath, settingName)}`)
}

const settingIsNotColor = setting => {
	const defined = isDefined
	const { r, g, b, a } = setting
	return !(defined(r) || defined(g) || defined(b) || defined(a))
}

export default composePatterns
