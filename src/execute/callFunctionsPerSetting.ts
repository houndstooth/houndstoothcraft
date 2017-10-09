import { accessChildPropertyOrCreatePath } from '../utilities/codeUtilities'
import state from '../state'

const callFunctionsPerSetting = ({ settingsFunctions }) => {
	settingsFunctions.forEach(settingsFunction => {
		const { settingsPath, settingName, settingFunctionItself } = settingsFunction
		const settings = accessChildPropertyOrCreatePath({
			objectWithProperties: state.mainHoundstooth.basePattern,
			propertyPath: settingsPath,
		})
		settings[ settingName ] = settingFunctionItself(settings[ settingName ])
	})
}

export default callFunctionsPerSetting
