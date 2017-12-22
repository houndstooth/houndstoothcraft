// tslint:disable:no-any no-unsafe-any

import mapOverPattern from './mapOverPattern'
import { PatternMapFunctionParams, PrepareFunctionObjectsParams, SettingFunctionObject } from './types'

const prepareFunctionObjectsPerSetting: (_: PrepareFunctionObjectsParams) => SettingFunctionObject[] =
	({ settingFunctionsSourcePattern }: PrepareFunctionObjectsParams): SettingFunctionObject[] => {
		const settingFunctionObjects: SettingFunctionObject[] = []
		mapOverPattern({
			options: { settingFunctionObjects },
			pattern: settingFunctionsSourcePattern,
			perLeaf,
		})

		return settingFunctionObjects
	}

const perLeaf: (_: PatternMapFunctionParams) => void =
	({ options, settingValue, settingName, settingPath }: PatternMapFunctionParams): void => {
		if (typeof settingValue === 'function') {
			options.settingFunctionObjects.push({
				settingFunction: settingValue,
				settingName,
				settingPath,
			})
		}
	}

export default prepareFunctionObjectsPerSetting
