// tslint:disable:no-any no-unsafe-any

import { to } from '../../utilities'
import deeperPath from './deeperPath'
import shouldRecurse from './shouldRecurse'
import {
	PrepareFunctionObjectForSettingOrMaybeRecurseParams,
	PrepareFunctionObjectsParams,
	SettingsFunctionObject,
} from './types'

const prepareFunctionObjectsPerSetting: (_: PrepareFunctionObjectsParams) => SettingsFunctionObject[] =
	(params: PrepareFunctionObjectsParams): SettingsFunctionObject[] => {
		const {
			settingsFunctionObjects = [],
			settingsFunctionsSourcePattern,
			settingsPath = to.SettingsPath([]),
		}: PrepareFunctionObjectsParams = params

		const settings: Array<[ string, any ]> = Object.entries(settingsFunctionsSourcePattern)

		settings.forEach(([ settingName, maybeSettingsFunctionsSourcePattern ]: [ string, any ]): void => {
			prepareFunctionObjectForSettingOrMaybeRecurse({
				maybeSettingsFunctionsSourcePattern,
				settingName: to.SettingsStep(settingName),
				settingsFunctionObjects,
				settingsPath,
			})
		})

		return settingsFunctionObjects
	}

const prepareFunctionObjectForSettingOrMaybeRecurse: (_: PrepareFunctionObjectForSettingOrMaybeRecurseParams) => void =
	(params: PrepareFunctionObjectForSettingOrMaybeRecurseParams): void => {
		const {
			maybeSettingsFunctionsSourcePattern,
			settingName,
			settingsFunctionObjects,
			settingsPath,
		}: PrepareFunctionObjectForSettingOrMaybeRecurseParams = params

		if (typeof maybeSettingsFunctionsSourcePattern === 'function') {
			settingsFunctionObjects.push({
				settingName: to.SettingsStep(settingName),
				settingsFunction: maybeSettingsFunctionsSourcePattern,
				settingsPath,
			})
		}
		else if (shouldRecurse(maybeSettingsFunctionsSourcePattern)) {
			prepareFunctionObjectsPerSetting({
				settingsFunctionObjects,
				settingsFunctionsSourcePattern: maybeSettingsFunctionsSourcePattern,
				settingsPath: deeperPath({ settingsPath, settingName: to.SettingsStep(settingName) }),
			})
		}
	}

export default prepareFunctionObjectsPerSetting
