import { accessChildPropertyOrCreatePath, deeperPath, isDefined } from '../utilities/codeUtilities'
import { Pattern, Setting } from '../store'
import { PropertyPath } from '../utilities/types'
import { Color } from '../render'
import maybeWarnAboutConflicts from './maybeWarnAboutConflicts'

const composePatterns: {
	({}: {
		patternToBeMergedOnto: Pattern,
		patternToMerge: Pattern,
		settingsPath?: PropertyPath,
		warnAboutConflicts?: boolean,
	}): void,
} = ({ patternToBeMergedOnto, patternToMerge, settingsPath = [] as PropertyPath, warnAboutConflicts }) => {
	if (!patternToMerge) {
		return
	}
	Object.entries(patternToMerge).forEach(([ settingName, overridingSetting ]) => {
		if (shouldRecurse({ overridingSetting })) {
			composePatterns({
				patternToBeMergedOnto,
				patternToMerge: overridingSetting as Pattern,
				settingsPath: deeperPath({ propertyPath: settingsPath, propertyName: settingName }),
				warnAboutConflicts,
			})
		}
		else {
			const settingsWithSettingToBeOverridden = accessChildPropertyOrCreatePath({
				objectWithProperties: patternToBeMergedOnto,
				propertyPath: settingsPath,
			})

			const existingSetting = settingsWithSettingToBeOverridden[ settingName ]

			maybeWarnAboutConflicts({
				warnAboutConflicts,
				settingsPath,
				settingName,
				existingSetting,
				overridingSetting,
			})

			settingsWithSettingToBeOverridden[ settingName ] = overridingSetting
		}
	})
}

const shouldRecurse: { ({}: { overridingSetting: Setting }): boolean } = ({ overridingSetting }) =>
	settingIsNonArrayObject(overridingSetting) && settingIsNotColor(overridingSetting)

const settingIsNonArrayObject: { (setting: Setting): boolean } = setting => {
	if (!setting) {
		return false
	}
	if (typeof setting !== 'object') {
		return false
	}

	return !(setting as any instanceof Array)
}

const settingIsNotColor: { (setting: Setting): boolean } = setting => {
	const defined = isDefined
	const maybeSettingColor = setting as Color
	const { r, g, b, a } = maybeSettingColor

	return !(defined(r) || defined(g) || defined(b) || defined(a))
}

export default composePatterns
