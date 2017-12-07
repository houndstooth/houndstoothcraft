// tslint:disable:no-any no-unsafe-any

import { patternState } from '../../pattern'
import { getPatternSettingOrCreatePath, SettingsFunctionObject } from '../settings'

const callFunctionsPerSetting: (_: { settingsFunctionObjects: SettingsFunctionObject[] }) => void =
	({ settingsFunctionObjects }: { settingsFunctionObjects: SettingsFunctionObject[] }): void => {
		settingsFunctionObjects.forEach((settingsFunctionObject: SettingsFunctionObject): void => {
			const { settingsPath, settingsFunction, settingName } = settingsFunctionObject

			getPatternSettingOrCreatePath.default({
				pattern: patternState,
				settingsPath,
			})[ settingName ] = settingsFunction()
		})
	}

export default callFunctionsPerSetting
