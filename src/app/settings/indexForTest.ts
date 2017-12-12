import * as checkSettingForConflict from './checkSettingForConflict'
import * as combineEffects from './combineEffects'
import * as composeMainHoundstooth from './composeMainHoundstooth'
import * as composePatterns from './composePatterns'
import * as deeperPath from './deeperPath'
import * as effectsHaveConflicts from './effectsHaveConflicts'
import * as getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import * as initializeCurrentPatternFromBasePattern from './initializeCurrentPatternFromBasePattern'
import * as patternsHaveConflicts from './patternsHaveConflicts'
import * as prepareFunctionObjectsPerSetting from './prepareFunctionObjectsPerSetting'
import * as resetMainHoundstooth from './resetMainHoundstooth'
import * as settingPath from './settingPath'
import * as shouldRecurse from './shouldRecurse'

export {
	checkSettingForConflict,
	combineEffects,
	composeMainHoundstooth,
	composePatterns,
	deeperPath,
	effectsHaveConflicts,
	getPatternSettingOrCreatePath,
	initializeCurrentPatternFromBasePattern,
	patternsHaveConflicts,
	prepareFunctionObjectsPerSetting,
	resetMainHoundstooth,
	settingPath,
	shouldRecurse,
}
export {
	CheckSettingForConflict,
	ComposeMainHoundstoothParams,
	ComposePatternsParams,
	FullSettingsPath,
	PatternsHaveConflictsParams,
	PrepareFunctionObjectsParams,
	SettingsFunction,
	SettingsFunctionObject,
	SettingsPath,
	SettingsStep,
} from './types'
export {
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,
} from './defaults'
