// tslint:disable:no-reaching-imports

export {
	combineEffects,
	composeMainHoundstooth,
	effectsHaveConflicts,
	getEffectSetting,
	resetMainHoundstooth,
	setupAvailableEffects,

	GetEffectSetting,
} from './effect/indexForTest'
export {
	checkSettingForConflict,
	composePatterns,
	concatFullSettingPath,
	deeperPath,
	getPatternSettingOrCreatePath,
	initializeCurrentPatternFromBasePattern,
	mapOverPattern,
	patternsHaveConflicts,
	prepareFunctionObjectsPerSetting,
	shouldRecurse,

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
} from './pattern/indexForTest'
export {
	SettingPath,
	SettingStep,
} from './types'
export {
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,
} from './defaults'
