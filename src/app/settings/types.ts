// tslint:disable:no-any max-file-line-count

import { FullPatternBaseValues } from '../../pattern'
import { Effect, Houndstooth, NamedEffect, Pattern } from '../../types'
import { ObjectOf } from '../../utilities'

enum _SettingPathBrand {}
type SettingPath = _SettingPathBrand & SettingStep[]

enum _SettingStepBrand {}
type SettingStep = _SettingStepBrand & string;

interface CheckSettingForConflictParams extends FullSettingPath, SettingConflictCheck {
}

interface PatternsHaveConflictsParams {
	pattern?: Pattern,
	patternCheckingAgainst?: Pattern,
	patternName: SettingStep,
	settingPath?: SettingPath,
}

interface SettingConflictCheck {
	setting: any,
	settingCheckingForConflict: any,
}

interface ComposePatternParams {
	patternDefaults: Pattern,
	patternEffects?: Pattern,
	patternOverrides?: Pattern,
	patternToCompose: Pattern,
}

interface ComposePatternsParams {
	patternToBeMergedOnto: Pattern,
	patternToMerge?: any,
	settingPath?: SettingPath,
}

interface SettingPathAndName {
	settingName: SettingStep,
	settingPath: SettingPath,
}

interface FullSettingPath extends SettingPathAndName {
	patternName: SettingStep,
}

interface PrepareFunctionObjectForSettingOrMaybeRecurseParams extends SettingPathAndName {
	maybeSettingFunctionsSourcePattern: any,
	settingFunctionObjects: SettingFunctionObject[],
}

interface PrepareFunctionObjectsParams {
	settingFunctionObjects?: SettingFunctionObject[],
	settingFunctionsSourcePattern: any,
	settingPath?: SettingPath,
}

type SettingFunction<T> = (_?: T) => T

interface SettingFunctionObject extends SettingPathAndName {
	settingFunction: SettingFunction<any>,
}

type SettingsAreEqual = (a: any, b: any) => boolean

interface SettingsState {
	availableEffects: ObjectOf<NamedEffect>,
	currentPattern: FullPatternBaseValues,
	mainHoundstooth: Houndstooth,
	overrides: Effect,
}

interface PatternMapFunctionParams extends FullSettingPath {
	options: any,
	settingValue: any,
}

interface MapOverPatternParams {
	options?: any,
	pattern?: Pattern,
	patternName?: SettingStep,
	perLeaf?: (_: PatternMapFunctionParams) => void,
	perParent?: (_: PatternMapFunctionParams) => void,
}

interface DeepSettingsMapParams {
	settingPath: SettingPath,
	settings: any,
}

export {
	CheckSettingForConflictParams,
	ComposePatternParams,
	ComposePatternsParams,
	DeepSettingsMapParams,
	FullSettingPath,
	MapOverPatternParams,
	PatternsHaveConflictsParams,
	PrepareFunctionObjectForSettingOrMaybeRecurseParams,
	PrepareFunctionObjectsParams,
	SettingConflictCheck,
	SettingFunction,
	SettingFunctionObject,
	SettingPath,
	SettingPathAndName,
	SettingsAreEqual,
	SettingsState,
	SettingStep,
}
