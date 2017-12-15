import * as checkSettingForConflict from './checkSettingForConflict'
import * as combineEffects from './combineEffects'
import * as composeMainHoundstooth from './composeMainHoundstooth'
import * as composePatterns from './composePatterns'
import * as deeperPath from './deeperPath'
import * as effectsHaveConflicts from './effectsHaveConflicts'
import * as formatSettingPath from './formatSettingPath'
import * as getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import * as initializeCurrentPatternFromBasePattern from './initializeCurrentPatternFromBasePattern'
import * as mapOverPattern from './mapOverPattern'
import * as patternsHaveConflicts from './patternsHaveConflicts'
import * as prepareFunctionObjectsPerSetting from './prepareFunctionObjectsPerSetting'
import * as resetMainHoundstooth from './resetMainHoundstooth'
import * as setupAvailableEffects from './setupAvailableEffects'
import * as shouldRecurse from './shouldRecurse'

export {
	checkSettingForConflict,
	combineEffects,
	composeMainHoundstooth,
	composePatterns,
	deeperPath,
	effectsHaveConflicts,
	formatSettingPath,
	getPatternSettingOrCreatePath,
	initializeCurrentPatternFromBasePattern,
	mapOverPattern,
	patternsHaveConflicts,
	prepareFunctionObjectsPerSetting,
	resetMainHoundstooth,
	setupAvailableEffects,
	shouldRecurse,
}
export {
	CheckSettingForConflict,
	ComposePatternsParams,
	FullSettingPath,
	MapOverPatternParams,
	PatternsHaveConflictsParams,
	PrepareFunctionObjectsParams,
	SettingFunction,
	SettingFunctionObject,
	SettingPath,
	SettingStep,
} from './types'
export {
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,
} from './defaults'
