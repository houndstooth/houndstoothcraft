import { Pattern } from '../store'
import { deeperPath } from '../utilities/codeUtilities'
import { PropertyPath } from '../utilities/types'
import { SettingsFunctionObject } from './types'

const prepareFunctionObjectsPerSetting: (_: {
	settingsFunctionObjects?: SettingsFunctionObject[],
	settingsFunctionsSourcePattern: Pattern,
	settingsPath?: PropertyPath,
}) => SettingsFunctionObject[] = prepareFunctionObjectsPerSettingArgs => {
	const {
		settingsFunctionObjects = [],
		settingsFunctionsSourcePattern,
		settingsPath = [] as any,
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
				settingsPath: deeperPath({ propertyPath: settingsPath, propertyName: settingName }),
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
