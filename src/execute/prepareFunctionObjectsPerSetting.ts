import { deeperPath, Pattern, SettingsPath } from '../store'
import * as to from '../utilities/to'
import { SettingsFunctionObject } from './types'

const prepareFunctionObjectsPerSetting: (_: {
	settingsFunctionObjects?: SettingsFunctionObject[],
	settingsFunctionsSourcePattern: Pattern,
	settingsPath?: SettingsPath[],
}) => SettingsFunctionObject[] = prepareFunctionObjectsPerSettingArgs => {
	const {
		settingsFunctionObjects = [],
		settingsFunctionsSourcePattern,
		settingsPath = to.SettingsPath([]),
	} = prepareFunctionObjectsPerSettingArgs

	Object.entries(settingsFunctionsSourcePattern).forEach(([ settingName, maybeSettingsFunctionsSourcePattern ]) => {
		if (typeof maybeSettingsFunctionsSourcePattern === 'function') {
			settingsFunctionObjects.push({
				settingName: to.SettingsPath(settingName),
				settingsFunction: maybeSettingsFunctionsSourcePattern,
				settingsPath,
			})
		}
		else if (shouldRecurse({ maybeSettingsFunctionsSourcePattern })) {
			prepareFunctionObjectsPerSetting({
				settingsFunctionObjects,
				settingsFunctionsSourcePattern: maybeSettingsFunctionsSourcePattern,
				settingsPath: deeperPath({ settingsPath, settingName: to.SettingsPath(settingName) }),
			})
		}
	})

	return settingsFunctionObjects
}

const shouldRecurse: (_: {
	maybeSettingsFunctionsSourcePattern: Pattern,
}) => boolean = ({ maybeSettingsFunctionsSourcePattern }) => {
	// tslint:disable-next-line:strict-type-predicates
	if (typeof maybeSettingsFunctionsSourcePattern !== 'object') {
		return false
	}

	return !(maybeSettingsFunctionsSourcePattern instanceof Array)
}

export { prepareFunctionObjectsPerSetting }
