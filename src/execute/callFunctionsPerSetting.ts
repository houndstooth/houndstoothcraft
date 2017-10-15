import { accessChildPropertyOrCreatePath } from '../utilities/codeUtilities'
import state from '../state'
import { SettingsFunctionObject } from './types'

const callFunctionsPerSetting: {
	({}: { settingsFunctionObjects: SettingsFunctionObject[] }): void,
} = ({ settingsFunctionObjects }) => {
	settingsFunctionObjects.forEach(settingsFunctionObject => {
		const { settingsPath, settingName } = settingsFunctionObject
		const settingsFunction: { <T>(p: T): T } = settingsFunctionObject.settingsFunction
		const settings = accessChildPropertyOrCreatePath({
			objectWithProperties: state.mainHoundstooth.basePattern,
			propertyPath: settingsPath,
		})
		settings[ settingName ] = settingsFunction(settings[ settingName ])
	})
}

export default callFunctionsPerSetting
