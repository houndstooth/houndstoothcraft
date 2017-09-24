import { console } from '../utilities/windowWrapper'
import { deeperPath } from '../utilities/codeUtilities'

const prepareFunctionsPerSetting = ({ settingsFunctions, settingsPath = [], functionsArray = [] }) => {
	Object.entries(settingsFunctions).forEach(([ settingName, maybeSettingFunction ]) => {
		if (typeof maybeSettingFunction === 'function') {
			functionsArray.push({ settingFunctionItself: maybeSettingFunction, settingsPath, settingName })
		}
		else if (typeof maybeSettingFunction === 'object' && !(maybeSettingFunction instanceof Array)) {
			prepareFunctionsPerSetting({
				settingsFunctions: maybeSettingFunction,
				settingsPath: deeperPath({ propertyPath: settingsPath, propertyName: settingName }),
				functionsArray,
			})
		}
		else {
			console.error(`These settings should map onto basePattern settings, and be functions to call for them each animation frame / layer. However, you have provided a non-function ${maybeSettingFunction} at path ${settingsPath} ${settingName}`)
		}
	})
	return functionsArray
}

export default prepareFunctionsPerSetting
