// tslint:disable:no-any no-unsafe-any

import { state } from '../../state'
import { getPatternSettingOrCreatePath } from '../store'
import { SettingsFunction, SettingsFunctionObject } from './types'

const callFunctionsPerSetting: (_: { settingsFunctionObjects: SettingsFunctionObject[] }) => void =
	({ settingsFunctionObjects }: { settingsFunctionObjects: SettingsFunctionObject[] }): void => {
		settingsFunctionObjects.forEach((settingsFunctionObject: SettingsFunctionObject): void => {
			const { settingsPath, settingName } = settingsFunctionObject
			const settingsFunction: SettingsFunction<any> = settingsFunctionObject.settingsFunction
			const settings: { [_: string]: any } = getPatternSettingOrCreatePath.main({
				pattern: state.mainHoundstooth.basePattern,
				settingsPath,
			})
			const previousState: any = settings[ settingName ]
			// tslint:disable-next-line:no-inferred-empty-object-type
			settings[ settingName ] = settingsFunction(previousState)
		})
	}

export { callFunctionsPerSetting as main }
