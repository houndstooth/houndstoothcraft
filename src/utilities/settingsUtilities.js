import consoleWrapper from '../application/consoleWrapper'
import codeUtilities from './codeUtilities'
import registeredSettings from '../settings/registeredSettings'
import defaultSettings from '../settings/defaultSettings'

const RECOGNIZED_PATTERN_SETTINGS = [ 'base', 'animations', 'iterations' ]

const prepareFunctionsPerSetting = ({ settingsFunctions, settingsPath = [], functionsArray = [] }) => {
	Object.entries(settingsFunctions).forEach(([ key, value ]) => {
		if (typeof value === 'function') {
			functionsArray.push({ fn: value, settingsPath, settingName: key })
		}
		else if (typeof value === 'object' && !(value instanceof Array)) {
			prepareFunctionsPerSetting({
				settingsFunctions: value,
				settingsPath: codeUtilities.deeperPath({ settingsPath, settingName: key }),
				functionsArray,
			})
		}
		else {
			consoleWrapper.error(`These settings should map onto base settings, and be functions to call for them each animation / iteration frame. However, you have provided a non-function ${value} at path ${settingsPath} ${key}`)
		}
	})
	return functionsArray
}

const applyOverrides = ({ settingsWithSettingsToBeOverridden, settingsWithSettingsOverrides, settingsPath = [], settingsRegisteredCheck = registeredSettings }) => {
	if (!settingsWithSettingsOverrides) return
	Object.entries(settingsWithSettingsOverrides).forEach(([ settingName, overridingSetting ]) => {
		let deeperSettingsRegisteredCheck
		if (codeUtilities.settingIsDefinedOnSettings({
			settingName,
			settingsMaybeWithSetting: settingsRegisteredCheck,
		})) {
			deeperSettingsRegisteredCheck = settingsRegisteredCheck[ settingName ]
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
				settingsRegisteredCheck: deeperSettingsRegisteredCheck,
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
	let childSetting = currentState.settings
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
		setting = codeUtilities.accessChildSettingOrCreatePath({ settingsRoot: currentState.settings, settingsPath })
	}
	else {
		setting = codeUtilities.accessChildSettingOrCreatePath({ settingsRoot: defaultSettings, settingsPath })
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
