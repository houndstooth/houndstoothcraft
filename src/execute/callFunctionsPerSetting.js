import codeUtilities from '../utilities/codeUtilities'
import store from '../../store'

export default ({ settingsFunctions }) => {
	settingsFunctions.forEach(settingsFunction => {
		const { settingsPath, settingName, settingFunctionItself } = settingsFunction
		let settingsWithSettingToCallFunctionOn = codeUtilities.accessChildPropertyOrCreatePath({
			objectWithProperties: store.mainHoundstooth.basePattern,
			propertyPath: settingsPath,
		})
		settingsWithSettingToCallFunctionOn[ settingName ] = settingFunctionItself(settingsWithSettingToCallFunctionOn[ settingName ])
	})
}
