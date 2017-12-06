// tslint:disable:no-any no-unsafe-any

import { getPatternSettingOrCreatePath, SettingsFunctionObject } from '../settings'
import { state } from '../state'

const callFunctionsPerSetting: (_: { settingsFunctionObjects: SettingsFunctionObject[] }) => void =
	({ settingsFunctionObjects }: { settingsFunctionObjects: SettingsFunctionObject[] }): void => {
		settingsFunctionObjects.forEach((settingsFunctionObject: SettingsFunctionObject): void => {
			const { settingsPath, settingsFunction, settingName } = settingsFunctionObject

			getPatternSettingOrCreatePath.default({
				pattern: state.settings.currentPattern,
				settingsPath,
			})[ settingName ] = settingsFunction()
		})
	}

export default callFunctionsPerSetting
