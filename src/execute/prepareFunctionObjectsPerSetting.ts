import { Pattern } from '../store'
import * as to from '../to'
import { deeperPath } from '../utilities/codeUtilities'
import { SettingsPath } from '../store'
import { SettingsFunctionObject } from './types'

const prepareFunctionObjectsPerSetting: (_: {
	settingsFunctionObjects?: SettingsFunctionObject[],
	settingsFunctionsSourcePattern: Pattern,
	settingsPath?: SettingsPath,
}) => SettingsFunctionObject[] = prepareFunctionObjectsPerSettingArgs => {
	const {
		settingsFunctionObjects = [],
		settingsFunctionsSourcePattern,
		settingsPath = to.SettingsPath([]),
	} = prepareFunctionObjectsPerSettingArgs

	Object.entries(settingsFunctionsSourcePattern).forEach(([ settingName, maybeSettingsFunctionsSourcePattern ]) => {
		if (typeof maybeSettingsFunctionsSourcePattern === 'function') {
			settingsFunctionObjects.push({
				settingName,
				settingsFunction: maybeSettingsFunctionsSourcePattern,
				settingsPath,
			})
		}
		else if (shouldRecurse({ maybeSettingsFunctionsSourcePattern })) {
			prepareFunctionObjectsPerSetting({
				settingsFunctionObjects,
				settingsFunctionsSourcePattern: maybeSettingsFunctionsSourcePattern,
				settingsPath: deeperPath({ settingsPath, settingName: to.SettingsStep(settingName) }),
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
