import { deeperPath } from '../utilities/codeUtilities'
import { Pattern } from '../store'
import { PropertyPath } from '../utilities/types'
import { SettingsFunctionObject } from './types'

const prepareFunctionObjectsPerSetting: {
	({}: {
		settingsFunctionObjects?: SettingsFunctionObject[],
		settingsFunctionsSourcePattern: Pattern,
		settingsPath?: PropertyPath,
	}): SettingsFunctionObject[],
} = prepareFunctionObjectsPerSettingArgs => {
	const {
		settingsFunctionObjects = [],
		settingsFunctionsSourcePattern,
		settingsPath = [] as any,
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

const shouldRecurse: {
	({}: { maybeSettingsFunctionsSourcePattern: Pattern }): boolean,
} = ({ maybeSettingsFunctionsSourcePattern }) => {
	// tslint:disable-next-line:strict-type-predicates
	if (typeof maybeSettingsFunctionsSourcePattern !== 'object') {
		return false
	}

	return !(maybeSettingsFunctionsSourcePattern instanceof Array)
}

export default prepareFunctionObjectsPerSetting
