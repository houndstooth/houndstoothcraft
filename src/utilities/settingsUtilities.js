import consoleWrapper from '../application/consoleWrapper'
import codeUtilities from './codeUtilities'
import registeredSettings from '../settings/registeredSettings'
import defaultSettings from '../settings/defaultSettings'

const SETTINGS_OBJECT_NAMES = [ 'base', 'animations', 'iterations' ]

const prepareFunctionsPerSetting = ({ objectWithFunctions, settingsPath = [], functionsArray = [] }) => {
	Object.entries(objectWithFunctions).forEach(([ key, value ]) => {
		if (typeof value === 'function') {
			functionsArray.push({ fn: value, settingsPath, settingName: key })
		}
		else if (typeof value === 'object' && !(value instanceof Array)) {
			prepareFunctionsPerSetting({
				objectWithFunctions: value,
				settingsPath: codeUtilities.deeperPath({ settingsPath, settingName: key }),
				functionsArray,
			})
		}
		else {
			consoleWrapper.error(`This object is supposed to be an object whose structure matches that of the base settings, and whose leaf values are functions to be applied to those settings on each animation / iteration frame. However, you have provided a non-function ${value} at path ${settingsPath} ${key}`)
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
			let settingsWithSettingToBeOverridden = codeUtilities.accessChildObjectOrCreatePath({
				parentObject: settingsWithSettingsToBeOverridden,
				settingsPath,
			})
			settingsWithSettingToBeOverridden[ settingName ] = overridingSetting
		}
	})
}

const getFromSettingsOrDefault = settingsPath => {
	let childObject = currentState.settings
	let notThere
	settingsPath.forEach(pathStep => {
		if (notThere) return
		if (!codeUtilities.isDefined(childObject[ pathStep ])) {
			childObject = undefined
			notThere = true
			return
		}
		childObject = childObject[ pathStep ]
	})

	let setting
	if (codeUtilities.isDefined(childObject)) {
		setting = codeUtilities.accessChildObjectOrCreatePath({ parentObject: currentState.settings, settingsPath })
	}
	else {
		setting = codeUtilities.accessChildObjectOrCreatePath({ parentObject: defaultSettings, settingsPath })
	}
	return setting
}

const confirmSettingsObjectsParentIncludesOnlySettingsObjects = (settingsObjectParent) => {
	return Object.keys(settingsObjectParent).every(key => {
		if (!SETTINGS_OBJECT_NAMES.includes(key)) {
			consoleWrapper.error(`Unknown settings object: ${key}`)
			return false
		}
		return true
	})
}

export default {
	prepareFunctionsPerSetting,
	applyOverrides,
	getFromSettingsOrDefault,
	confirmSettingsObjectsParentIncludesOnlySettingsObjects,
}
