import consoleWrapper from '../application/consoleWrapper'
import codeUtilities from './codeUtilities'
import patternStructure from '../state/patternStructure'
import patternDefaults from '../state/patternDefaults'
import store from '../../store'

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

const mergeSettings = ({ settingsToBeMergedOnto, settingsToMerge, settingsPath = [], patternStructureChecker = patternStructure.PATTERN_STRUCTURE }) => {
	if (!settingsToMerge) return
	Object.entries(settingsToMerge).forEach(([ settingName, overridingSetting ]) => {
		let deeperPatternStructureChecker
		if (codeUtilities.settingIsDefinedOnSettings({
			settingName,
			settingsMaybeWithSetting: patternStructureChecker,
		})) {
			deeperPatternStructureChecker = patternStructureChecker[ settingName ]
		}
		else {
			consoleWrapper.error(`Attempted to add a setting to the pattern which is unrecognized in the pattern structure: ${settingsPath.join('.')}.${settingName}`)
			return
		}

		if (overridingSetting && typeof overridingSetting === 'object' && !overridingSetting.length) {
			mergeSettings({
				settingsToBeMergedOnto,
				settingsToMerge: overridingSetting,
				settingsPath: codeUtilities.deeperPath({ settingsPath, settingName }),
				patternStructureChecker: deeperPatternStructureChecker,
			})
		}
		else {
			let settingsWithSettingToBeOverridden = codeUtilities.accessChildSettingOrCreatePath({
				settingsRoot: settingsToBeMergedOnto,
				settingsPath,
			})
			settingsWithSettingToBeOverridden[ settingName ] = overridingSetting
		}
	})
}

const getFromBuiltPatternOrDefault = settingsPath => {
	let childSetting = store.currentState.builtPattern
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
		setting = codeUtilities.accessChildSettingOrCreatePath({ settingsRoot: store.currentState.builtPattern, settingsPath })
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
	mergeSettings,
	getFromBuiltPatternOrDefault,
	confirmPatternHasNoNonSettings,
}
