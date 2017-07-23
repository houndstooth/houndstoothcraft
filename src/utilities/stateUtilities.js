import consoleWrapper from '../application/consoleWrapper'
import codeUtilities from './codeUtilities'
import patternStructure from '../state/patternStructure'
import houndstoothDefaults from '../state/houndstoothDefaults'
import store from '../../store'

const RECOGNIZED_HOUNDSTOOTH_PATTERNS = [ 'basePattern', 'animationsPattern', 'iterationsPattern' ]

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
			consoleWrapper.error(`These settings should map onto basePattern settings, and be functions to call for them each animation / iteration frame. However, you have provided a non-function ${maybeSettingFunction} at path ${settingsPath} ${settingName}`)
		}
	})
	return functionsArray
}

const mergePatterns = ({ patternToBeMergedOnto, patternToMerge, settingsPath = [], patternStructureChecker = patternStructure.PATTERN_STRUCTURE }) => {
	if (!patternToMerge) return
	Object.entries(patternToMerge).forEach(([ settingName, overridingSetting ]) => {
		let deeperPatternStructureChecker
		if (codeUtilities.settingIsDefinedOnSettings({
			settingName,
			settingsMaybeWithSetting: patternStructureChecker,
		})) {
			deeperPatternStructureChecker = patternStructureChecker[ settingName ]
		}
		else {
			consoleWrapper.error(`attempted to compose a pattern with an unrecognized setting: ${settingsPath.join('.')}.${settingName}`)
			return
		}

		if (overridingSetting && typeof overridingSetting === 'object' && !overridingSetting.length) {
			mergePatterns({
				patternToBeMergedOnto,
				patternToMerge: overridingSetting,
				settingsPath: codeUtilities.deeperPath({ settingsPath, settingName }),
				patternStructureChecker: deeperPatternStructureChecker,
			})
		}
		else {
			let settingsWithSettingToBeOverridden = codeUtilities.accessChildSettingOrCreatePath({
				settingsRoot: patternToBeMergedOnto,
				settingsPath,
			})
			settingsWithSettingToBeOverridden[ settingName ] = overridingSetting
		}
	})
}

const getFromMainHoundstoothOrDefault = settingsPath => {
	let childSetting = store.currentState.mainHoundstooth
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
		setting = codeUtilities.accessChildSettingOrCreatePath({ settingsRoot: store.currentState.mainHoundstooth, settingsPath })
	}
	else {
		setting = codeUtilities.accessChildSettingOrCreatePath({ settingsRoot: houndstoothDefaults.HOUNDSTOOTH_DEFAULTS, settingsPath })
	}
	return setting
}

const confirmHoundstoothHasNoUnrecognizedPatterns = houndstooth => {
	return Object.keys(houndstooth).every(pattern => {
		if (!RECOGNIZED_HOUNDSTOOTH_PATTERNS.includes(pattern)) {
			consoleWrapper.error(`attempted to compose a houndstooth with an unrecognized pattern: ${pattern}`)
			return false
		}
		return true
	})
}

export default {
	prepareFunctionsPerSetting,
	mergePatterns,
	getFromMainHoundstoothOrDefault,
	confirmHoundstoothHasNoUnrecognizedPatterns,
}
