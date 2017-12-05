// tslint:disable:no-any no-unsafe-any

import { state } from '../../state'
import { getPatternSettingOrCreatePath, SettingsFunctionObject } from '../settings'

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
