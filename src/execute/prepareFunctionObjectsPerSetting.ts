import { deeperPath } from '../utilities/codeUtilities'
import { Pattern } from '../store'
import SettingsFunctionObject from './SettingsFunctionObject'

type PrepareFunctionObjectsPerSetting = {
	({}: {
		settingsFunctionsSourcePattern: Pattern | Function,
		settingsPath?: string[],
		settingsFunctionObjects?: SettingsFunctionObject[],
	}): SettingsFunctionObject[],
}
const prepareFunctionObjectsPerSetting: PrepareFunctionObjectsPerSetting = prepareFunctionObjectsPerSettingArgs => {
	const {
		settingsFunctionsSourcePattern,
		settingsPath = [],
		settingsFunctionObjects = [],
	} = prepareFunctionObjectsPerSettingArgs

	Object.entries(settingsFunctionsSourcePattern).forEach(([ settingName, maybeSettingsFunctionsSourcePattern ]) => {
		if (typeof maybeSettingsFunctionsSourcePattern === 'function') {
			settingsFunctionObjects.push({
				settingsFunction: maybeSettingsFunctionsSourcePattern,
				settingsPath,
				settingName,
			})
		}
		else if (shouldRecurse({ maybeSettingsFunctionsSourcePattern })) {
			prepareFunctionObjectsPerSetting({
				settingsFunctionsSourcePattern: maybeSettingsFunctionsSourcePattern,
				settingsPath: deeperPath({ propertyPath: settingsPath, propertyName: settingName }),
				settingsFunctionObjects,
			})
		}
	})

	return settingsFunctionObjects
}

type ShouldRecurse = { ({}: { maybeSettingsFunctionsSourcePattern: Pattern }): boolean }
const shouldRecurse: ShouldRecurse = ({ maybeSettingsFunctionsSourcePattern }) => {
	if (typeof maybeSettingsFunctionsSourcePattern !== 'object') {
		return false
	}
	return !(maybeSettingsFunctionsSourcePattern instanceof Array)
}

export default prepareFunctionObjectsPerSetting
