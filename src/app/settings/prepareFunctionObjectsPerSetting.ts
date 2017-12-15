// tslint:disable:no-any no-unsafe-any

import { to } from '../../utilities'
import deeperPath from './deeperPath'
import shouldRecurse from './shouldRecurse'
import {
	PrepareFunctionObjectForSettingOrMaybeRecurseParams,
	PrepareFunctionObjectsParams,
	SettingFunctionObject,
} from './types'

const prepareFunctionObjectsPerSetting: (_: PrepareFunctionObjectsParams) => SettingFunctionObject[] =
	(params: PrepareFunctionObjectsParams): SettingFunctionObject[] => {
		const {
			settingFunctionObjects = [],
			settingFunctionsSourcePattern,
			settingPath = to.SettingPath([]),
		}: PrepareFunctionObjectsParams = params

		const settings: Array<[ string, any ]> = Object.entries(settingFunctionsSourcePattern)

		settings.forEach(([ settingNameString, maybeSettingFunctionsSourcePattern ]: [ string, any ]): void => {
			prepareFunctionObjectForSettingOrMaybeRecurse({
				maybeSettingFunctionsSourcePattern,
				settingFunctionObjects,
				settingName: to.SettingStep(settingNameString),
				settingPath,
			})
		})

		return settingFunctionObjects
	}

const prepareFunctionObjectForSettingOrMaybeRecurse: (_: PrepareFunctionObjectForSettingOrMaybeRecurseParams) => void =
	(params: PrepareFunctionObjectForSettingOrMaybeRecurseParams): void => {
		const {
			maybeSettingFunctionsSourcePattern,
			settingFunctionObjects,
			settingName,
			settingPath,
		}: PrepareFunctionObjectForSettingOrMaybeRecurseParams = params

		if (typeof maybeSettingFunctionsSourcePattern === 'function') {
			settingFunctionObjects.push({
				settingFunction: maybeSettingFunctionsSourcePattern,
				settingName,
				settingPath,
			})
		}
		else if (shouldRecurse(maybeSettingFunctionsSourcePattern)) {
			prepareFunctionObjectsPerSetting({
				settingFunctionObjects,
				settingFunctionsSourcePattern: maybeSettingFunctionsSourcePattern,
				settingPath: deeperPath({ settingPath, settingName }),
			})
		}
	}

export default prepareFunctionObjectsPerSetting
