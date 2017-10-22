import { Color } from '../render'
import { Pattern, Setting, SettingsPath } from '../store'
import { accessChildPropertyOrCreatePath, deeperPath, isDefined } from '../utilities/codeUtilities'
import * as to from '../utilities/to'
import { maybeWarnAboutConflicts } from './maybeWarnAboutConflicts'

const composePatterns: (_: {
	patternToBeMergedOnto: Pattern,
	patternToMerge: Pattern,
	settingsPath?: SettingsPath,
	warnAboutConflicts?: boolean,
}) => void = params => {
	const {
		patternToBeMergedOnto,
		patternToMerge,
		settingsPath = to.SettingsPath([]),
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
				settingsPath: deeperPath({ settingsPath, settingName: to.SettingsStep(settingName) }),
				warnAboutConflicts,
			})
		}
		else {
			const settingsWithSettingToBeOverridden = accessChildPropertyOrCreatePath({
				objectWithProperties: patternToBeMergedOnto,
				settingsPath,
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
