// tslint:disable:no-any no-unsafe-any

import { from } from '../../utilities'
import { appState } from '../appState'
import { getPatternSettingOrCreatePath, SettingFunctionObject } from '../settings'

const callFunctionsPerSetting: (_: { settingFunctionObjects: SettingFunctionObject[] }) => void =
	({ settingFunctionObjects }: { settingFunctionObjects: SettingFunctionObject[] }): void => {
		settingFunctionObjects.forEach((settingFunctionObject: SettingFunctionObject): void => {
			const { settingPath, settingFunction, settingName } = settingFunctionObject

			const settingParent: any = getPatternSettingOrCreatePath.default({
				pattern: appState.settings.currentPattern,
				settingPath,
			})
			const settingNameString: string = from.SettingStep(settingName)
			settingParent[ settingNameString ] = settingFunction(settingParent[ settingNameString ])
		})
	}

export default callFunctionsPerSetting
