import { Color } from '../render'
import { Pattern, Setting } from '../store'
import * as to from '../to'
import { accessChildPropertyOrCreatePath, deeperPath, isDefined } from '../utilities/codeUtilities'
import { PropertyPath } from '../utilities/types'
import { maybeWarnAboutConflicts } from './maybeWarnAboutConflicts'

const composePatterns: (_: {
	patternToBeMergedOnto: Pattern,
	patternToMerge: Pattern,
	settingsPath?: PropertyPath,
	warnAboutConflicts?: boolean,
}) => void = params => {
	const {
		patternToBeMergedOnto,
		patternToMerge,
		settingsPath = to.PropertyPath([]),
		warnAboutConflicts = false,
	} = params
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
				existingSetting,
				overridingSetting,
				settingName,
				settingsPath,
				warnAboutConflicts,
			})

			settingsWithSettingToBeOverridden[ settingName ] = overridingSetting
		}
	})
}

const shouldRecurse: (_: { overridingSetting: Setting }) => boolean = ({ overridingSetting }) =>
	settingIsNonArrayObject(overridingSetting) && settingIsNotColor(overridingSetting)

const settingIsNonArrayObject: (setting: Setting) => boolean = setting => {
	if (!setting) {
		return false
	}
	if (typeof setting !== 'object') {
		return false
	}

	return !(setting instanceof Array)
}

const settingIsNotColor: (setting: Setting) => boolean = setting => {
	const defined = isDefined
	const maybeSettingColor: Color = setting
	const { r, g, b, a } = maybeSettingColor

	return !(defined(r) || defined(g) || defined(b) || defined(a))
}

export { composePatterns }
