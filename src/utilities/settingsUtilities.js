import consoleWrapper from '../application/consoleWrapper'
import codeUtilities from './codeUtilities'
import recognizedSettings from '../settings/recognizedSettings'
import patternDefaults from '../settings/patternDefaults'

const RECOGNIZED_PATTERN_SETTINGS = [ 'base', 'animations', 'iterations' ]

const prepareFunctionsPerSetting = ({ settingsFunctions, settingsPath = [], functionsArray = [] }) => {
	Object.entries(settingsFunctions).forEach(([ settingName, maybeSettingFunction ]) => {
		if (typeof maybeSettingFunction === 'function') {
			const settingFunctionItself = maybeSettingFunction
			functionsArray.push({ settingFunctionItself, settingsPath, settingName })
		}
		else if (typeof maybeSettingFunction === 'object' && !(maybeSettingFunction instanceof Array)) {
			prepareFunctionsPerSetting({
				settingsFunctions: maybeSettingFunction,
				settingsPath: codeUtilities.deeperPath({ settingsPath, settingName }),
				functionsArray,
			})
		}
		else {
			consoleWrapper.error(`These settings should map onto base settings, and be functions to call for them each animation / iteration frame. However, you have provided a non-function ${maybeSettingFunction} at path ${settingsPath} ${settingName}`)
		}
	})
	return functionsArray
}

const applyOverrides = ({ settingsWithSettingsToBeOverridden, settingsWithSettingsOverrides, settingsPath = [], settingsRecognizedCheck = recognizedSettings }) => {
	if (!settingsWithSettingsOverrides) return
	Object.entries(settingsWithSettingsOverrides).forEach(([ settingName, overridingSetting ]) => {
		let deeperSettingsRecognizedCheck
		if (codeUtilities.settingIsDefinedOnSettings({
			settingName,
			settingsMaybeWithSetting: settingsRecognizedCheck,
		})) {
			deeperSettingsRecognizedCheck = settingsRecognizedCheck[ settingName ]
		}
		else {
			consoleWrapper.error(`Attempt to apply unknown settings: ${settingsPath.join('.')}.${settingName}`)
			return
		}

		if (overridingSetting && typeof overridingSetting === 'object' && !overridingSetting.length) {
			applyOverrides({
				settingsWithSettingsToBeOverridden,
				settingsWithSettingsOverrides: overridingSetting,
				settingsPath: codeUtilities.deeperPath({ settingsPath, settingName }),
				settingsRecognizedCheck: deeperSettingsRecognizedCheck,
			})
		}
		else {
			let settingsWithSettingToBeOverridden = codeUtilities.accessChildSettingOrCreatePath({
				settingsRoot: settingsWithSettingsToBeOverridden,
				settingsPath,
			})
			settingsWithSettingToBeOverridden[ settingName ] = overridingSetting
		}
	})
}

const getFromSettingsOrDefault = settingsPath => {
	let childSetting = currentState.builtPattern
	let notThere
	settingsPath.forEach(pathStep => {
		if (notThere) return
		if (!codeUtilities.isDefined(childSetting[ pathStep ])) {
			childSetting = undefined
			notThere = true
			return
		}
		childSetting = childSetting[ pathStep ]
	})

	let setting
	if (codeUtilities.isDefined(childSetting)) {
		setting = codeUtilities.accessChildSettingOrCreatePath({ settingsRoot: currentState.builtPattern, settingsPath })
	}
	else {
		setting = codeUtilities.accessChildSettingOrCreatePath({ settingsRoot: patternDefaults, settingsPath })
	}
	return setting
}

const confirmPatternHasNoNonSettings = pattern => {
	return Object.keys(pattern).every(key => {
		if (!RECOGNIZED_PATTERN_SETTINGS.includes(key)) {
			consoleWrapper.error(`Attempted to add unrecognized settings to pattern: ${key}`)
			return false
		}
		return true
	})
}

export default {
	prepareFunctionsPerSetting,
	applyOverrides,
	getFromSettingsOrDefault,
	confirmPatternHasNoNonSettings,
}
