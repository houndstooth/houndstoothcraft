import { accessChildPropertyOrCreatePath } from '../utilities/codeUtilities'
import state from '../state'
import SettingsFunctionObject from './SettingsFunctionObject'

type CallFunctionsPerSetting = { ({}: { settingsFunctionObjects: SettingsFunctionObject[] }): void }
const callFunctionsPerSetting: CallFunctionsPerSetting = ({ settingsFunctionObjects }) => {
	settingsFunctionObjects.forEach(settingsFunctionObject => {
		const { settingsPath, settingName, settingsFunction } = settingsFunctionObject
		const settings = accessChildPropertyOrCreatePath({
			objectWithProperties: state.mainHoundstooth.basePattern,
			propertyPath: settingsPath,
		})
		settings[ settingName ] = settingsFunction(settings[ settingName ])
	})
}

export default callFunctionsPerSetting
