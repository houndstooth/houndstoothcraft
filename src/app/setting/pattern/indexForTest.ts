import * as checkSettingForConflict from './checkSettingForConflict'
import * as composePatterns from './composePatterns'
import * as concatFullSettingPath from './concatFullSettingPath'
import * as deeperPath from './deeperPath'
import * as getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import * as initializeCurrentPatternFromBasePattern from './initializeCurrentPatternFromBasePattern'
import * as mapOverPattern from './mapOverPattern'
import * as patternsHaveConflicts from './patternsHaveConflicts'
import * as prepareFunctionObjectsPerSetting from './prepareFunctionObjectsPerSetting'

export {
	concatFullSettingPath,
	checkSettingForConflict,
	composePatterns,
	deeperPath,
	getPatternSettingOrCreatePath,
	initializeCurrentPatternFromBasePattern,
	mapOverPattern,
	patternsHaveConflicts,
	prepareFunctionObjectsPerSetting,
}
export {
	CheckSettingForConflictParams,
	ComposePatternsParams,
	DeeperPathParams,
	FullSettingPath,
	MapOverPatternParams,
	PatternMapFunctionParams,
	PatternsHaveConflictsParams,
	PrepareFunctionObjectsParams,
	SettingFunction,
	SettingFunctionObject,
} from './types'
