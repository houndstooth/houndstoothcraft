import { state } from '../state'
import { getSettingOrCreatePath } from '../store'
import { SettingsFunctionObject } from './types'

const callFunctionsPerSetting: (_: {
	settingsFunctionObjects: SettingsFunctionObject[],
}) => void = ({ settingsFunctionObjects }) => {
	settingsFunctionObjects.forEach(settingsFunctionObject => {
		const { settingsPath, settingName } = settingsFunctionObject
		const settingsFunction: <T>(p: T) => T = settingsFunctionObject.settingsFunction
		const settings = getSettingOrCreatePath({
			settings: state.mainHoundstooth.basePattern,
			settingsPath,
		})
		settings[ settingName ] = settingsFunction(settings[ settingName ])
	})
}

export { callFunctionsPerSetting }
