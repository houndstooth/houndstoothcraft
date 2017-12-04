// tslint:disable:no-any no-unsafe-any

import { state } from '../../state'
import { getPatternSettingOrCreatePath } from '../settings'
import { SettingsFunctionObject } from './types'

const callFunctionsPerSetting: (_: { settingsFunctionObjects: SettingsFunctionObject[] }) => void =
	({ settingsFunctionObjects }: { settingsFunctionObjects: SettingsFunctionObject[] }): void => {
		settingsFunctionObjects.forEach((settingsFunctionObject: SettingsFunctionObject): void => {
			const { settingsPath, settingsFunction, settingName } = settingsFunctionObject

			getPatternSettingOrCreatePath.default({
				pattern: state.currentPattern,
				settingsPath,
			})[ settingName ] = settingsFunction()
		})
	}

export default callFunctionsPerSetting
