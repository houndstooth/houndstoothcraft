// tslint:disable:no-any

import { Pattern } from '../../../types'
import { SettingPath, SettingStep } from '../types'

interface CheckSettingForConflictParams extends PatternMapFunctionParams {
	options: { patternCheckingAgainst: Pattern },
}

interface ComposePatternsParams {
	patternToBeMergedOnto: Pattern,
	patternToMerge?: any,
}

interface DeeperPathParams {
	settingName: SettingStep,
	settingPath: SettingPath,
}

interface DeepSettingsMapParams {
	settingPath: SettingPath,
	settings: any,
}

interface FullSettingPath extends DeeperPathParams {
	patternName: SettingStep,
}

interface MapOverPatternParams {
	options?: any,
	pattern?: Pattern,
	patternName?: SettingStep,
	perLeaf?: (_: PatternMapFunctionParams) => boolean | void,
	perParent?: (_: PatternMapFunctionParams) => void,
}

interface PatternMapFunctionParams extends FullSettingPath {
	options: any,
	settingValue: any,
}

interface PatternsHaveConflictsParams {
	pattern?: Pattern,
	patternCheckingAgainst?: Pattern,
	patternName: SettingStep,
}

interface PrepareFunctionObjectsParams {
	settingFunctionsSourcePattern: Pattern,
}

type SettingFunction<T> = (_?: T) => T

interface SettingFunctionObject extends DeeperPathParams {
	settingFunction: SettingFunction<any>,
}

export {
	CheckSettingForConflictParams,
	ComposePatternsParams,
	DeeperPathParams,
	DeepSettingsMapParams,
	FullSettingPath,
	MapOverPatternParams,
	PatternMapFunctionParams,
	PatternsHaveConflictsParams,
	PrepareFunctionObjectsParams,
	SettingFunction,
	SettingFunctionObject,
}
