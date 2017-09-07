import consoleWrapper from './consoleWrapper'
import codeUtilities from './codeUtilities'
import houndstoothStructure from '../store/houndstoothStructure'

const prepareFunctionsPerSetting = ({ settingsFunctions, settingsPath = [], functionsArray = [] }) => {
	Object.entries(settingsFunctions).forEach(([ settingName, maybeSettingFunction ]) => {
		if (typeof maybeSettingFunction === 'function') {
			functionsArray.push({ settingFunctionItself: maybeSettingFunction, settingsPath, settingName })
		}
		else if (typeof maybeSettingFunction === 'object' && !(maybeSettingFunction instanceof Array)) {
			prepareFunctionsPerSetting({
				settingsFunctions: maybeSettingFunction,
				settingsPath: codeUtilities.deeperPath({ propertyPath: settingsPath, propertyName: settingName }),
				functionsArray,
			})
		}
		else {
			consoleWrapper.error(`These settings should map onto basePattern settings, and be functions to call for them each animation frame / layer. However, you have provided a non-function ${maybeSettingFunction} at path ${settingsPath} ${settingName}`)
		}
	})
	return functionsArray
}

const houndstoothHasOnlyRecognizedPatterns = houndstooth => {
	return Object.keys(houndstooth).every(patternName => {
		if (!Object.keys(houndstoothStructure.HOUNDSTOOTH_STRUCTURE).includes(patternName)) {
			consoleWrapper.error(`attempted to compose a houndstooth with an unrecognized pattern: ${patternName}`)
			return false
		}
		return true
	})
}

export default {
	prepareFunctionsPerSetting,
	houndstoothHasOnlyRecognizedPatterns,
}
