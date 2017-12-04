// tslint:disable:no-any no-unsafe-any

import { Pattern } from '../../pattern'
import * as to from '../../to'
import { deeperPath } from '../settings'
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
		else if (shouldRecurse({ maybeSettingsFunctionsSourcePattern })) {
			prepareFunctionObjectsPerSetting({
				settingsFunctionObjects,
				settingsFunctionsSourcePattern: maybeSettingsFunctionsSourcePattern,
				settingsPath: deeperPath.default({ settingsPath, settingName: to.SettingsStep(settingName) }),
			})
		}
	}

const shouldRecurse: (_: { maybeSettingsFunctionsSourcePattern: Pattern }) => boolean =
	({ maybeSettingsFunctionsSourcePattern }: { maybeSettingsFunctionsSourcePattern: Pattern }): boolean => {
		// tslint:disable-next-line:strict-type-predicates
		if (typeof maybeSettingsFunctionsSourcePattern !== 'object') {
			return false
		}

		return !(maybeSettingsFunctionsSourcePattern instanceof Array)
	}

export default prepareFunctionObjectsPerSetting
