// tslint:disable:no-any no-unsafe-any

import { state } from '../../state'
import { getPatternSettingOrCreatePath } from '../store'
import { SettingsFunction, SettingsFunctionObject } from './types'

const callFunctionsPerSetting: (_: { settingsFunctionObjects: SettingsFunctionObject[] }) => void =
	({ settingsFunctionObjects }: { settingsFunctionObjects: SettingsFunctionObject[] }): void => {
		settingsFunctionObjects.forEach((settingsFunctionObject: SettingsFunctionObject): void => {
			const { settingsPath, settingName } = settingsFunctionObject
			const settingsFunction: SettingsFunction<any> = settingsFunctionObject.settingsFunction

			const basePatternSettings: { [_: string]: any } = getPatternSettingOrCreatePath.default({
				pattern: state.mainHoundstooth.basePattern,
				settingsPath,
			})
			const previousState: any = basePatternSettings[ settingName ]
			const newState: any = settingsFunction(previousState)

			// tslint:disable-next-line:no-inferred-empty-object-type
			basePatternSettings[ settingName ] = newState

			const currentPatternSettings: { [_: string]: any } = getPatternSettingOrCreatePath.default({
				pattern: state.currentPattern,
				settingsPath,
			})
			// tslint:disable-next-line:no-inferred-empty-object-type
			currentPatternSettings[ settingName ] = newState
		})
	}

export default callFunctionsPerSetting
