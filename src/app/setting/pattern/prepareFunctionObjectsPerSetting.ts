// tslint:disable:no-any no-unsafe-any

import { PatternMapFunctionParams, PrepareFunctionObjectsParams, SettingFunctionObject } from './types'
import mapOverPattern from './mapOverPattern'

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

const perLeaf = ({ options, settingValue, settingName, settingPath }: PatternMapFunctionParams) => {
	if (typeof settingValue === 'function') {
		options.settingFunctionObjects.push({
			settingFunction: settingValue,
			settingName,
			settingPath,
		})
	}
}

export default prepareFunctionObjectsPerSetting
