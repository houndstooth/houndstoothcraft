import { accessChildPropertyOrCreatePath, deeperPath, isDefined } from '../utilities/codeUtilities'
import { Pattern } from '../store'
import maybeWarnAboutConflicts from './maybeWarnAboutConflicts'
import { SettingsPath } from './types'

type ComposePatterns = {
	({}: {
		patternToBeMergedOnto: Pattern,
		patternToMerge: any,
		settingsPath?: SettingsPath,
		warnAboutConflicts?: boolean,
	}): void,
}
const composePatterns: ComposePatterns = params => {
	const { patternToBeMergedOnto, patternToMerge, settingsPath = [], warnAboutConflicts } = params
	if (!patternToMerge) {
		return
	}
	Object.entries(patternToMerge).forEach(([ settingName, overridingSetting ]) => {
		if (shouldRecurse({ overridingSetting })) {
			composePatterns({
				patternToBeMergedOnto,
				patternToMerge: overridingSetting,
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

const shouldRecurse: { ({}: { overridingSetting: any }): boolean } = ({ overridingSetting }) => {
	return settingIsNonArrayObject(overridingSetting) && settingIsNotColor(overridingSetting)
}

const settingIsNonArrayObject: { (setting: any): boolean } = setting => {
	return setting && typeof setting === 'object' && !setting.length
}

const settingIsNotColor: { (setting: any): boolean } = setting => {
	const defined = isDefined
	const { r, g, b, a } = setting
	return !(defined(r) || defined(g) || defined(b) || defined(a))
}

export default composePatterns
