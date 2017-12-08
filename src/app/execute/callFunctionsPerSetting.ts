// tslint:disable:no-any no-unsafe-any

import { appState } from '../appState'
import { getPatternSettingOrCreatePath, SettingsFunctionObject } from '../settings'

const callFunctionsPerSetting: (_: { settingsFunctionObjects: SettingsFunctionObject[] }) => void =
	({ settingsFunctionObjects }: { settingsFunctionObjects: SettingsFunctionObject[] }): void => {
		settingsFunctionObjects.forEach((settingsFunctionObject: SettingsFunctionObject): void => {
			const { settingsPath, settingsFunction, settingName } = settingsFunctionObject

			const settingParent: any = getPatternSettingOrCreatePath.default({
				pattern: appState.settings.currentPattern,
				settingsPath,
			})
			settingParent[ settingName ] = settingsFunction(settingParent[ settingName ])
		})
	}

export default callFunctionsPerSetting
