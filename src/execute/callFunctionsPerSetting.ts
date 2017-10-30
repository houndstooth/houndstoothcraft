import { state } from '../state'
import { getSettingOrCreatePath } from '../store'
import { SettingsFunction, SettingsFunctionObject } from './types'

const callFunctionsPerSetting: (_: { settingsFunctionObjects: SettingsFunctionObject[] }) => void =
	({ settingsFunctionObjects }: { settingsFunctionObjects: SettingsFunctionObject[] }): void => {
		settingsFunctionObjects.forEach((settingsFunctionObject: SettingsFunctionObject): void => {
			const { settingsPath, settingName } = settingsFunctionObject
			const settingsFunction: SettingsFunction = settingsFunctionObject.settingsFunction
			// tslint:disable-next-line:no-unsafe-any no-any
			const settings: { [_: string]: any } = getSettingOrCreatePath({
				settings: state.mainHoundstooth.basePattern,
				settingsPath,
			})
			// tslint:disable-next-line:no-any
			const previousState: any = settings[ settingName ]
			// tslint:disable-next-line:no-unsafe-any
			settings[ settingName ] = settingsFunction(previousState)
		})
	}

export { callFunctionsPerSetting }
