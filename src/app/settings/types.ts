// tslint:disable:no-any max-file-line-count

import { FullPatternBaseValues } from '../../pattern'
import { Effect, Houndstooth, NamedEffect, Pattern } from '../../types'
import { ObjectOf } from '../../utilities'

enum _SettingPathBrand {}

type SettingPath = _SettingPathBrand & SettingStep[]

enum _SettingStepBrand {}

type SettingStep = _SettingStepBrand & string;

interface CheckSettingForConflict extends FullSettingPath, SettingConflictCheck {
}

interface PatternsHaveConflictsParams {
	pattern?: Pattern,
	patternCheckingAgainst?: Pattern,
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

interface FullSettingPath {
	settingName: SettingStep,
	settingPath: SettingPath,
}

interface PrepareFunctionObjectForSettingOrMaybeRecurseParams extends FullSettingPath {
	maybeSettingFunctionsSourcePattern: any,
	settingFunctionObjects: SettingFunctionObject[],
}

interface PrepareFunctionObjectsParams {
	settingFunctionObjects?: SettingFunctionObject[],
	settingFunctionsSourcePattern: any,
	settingPath?: SettingPath,
}

type SettingFunction<T> = (_?: T) => T

interface SettingFunctionObject extends FullSettingPath {
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
	perLeaf?: (_: PatternMapFunctionParams) => void,
	perParent?: (_: PatternMapFunctionParams) => void,
}

interface DeepSettingsMapParams {
	settingPath: SettingPath,
	settings: any,
}

export {
	SettingPath,
	SettingStep,
	CheckSettingForConflict,
	PatternsHaveConflictsParams,
	SettingConflictCheck,
	ComposePatternParams,
	ComposePatternsParams,
	FullSettingPath,
	PrepareFunctionObjectForSettingOrMaybeRecurseParams,
	PrepareFunctionObjectsParams,
	SettingFunction,
	SettingFunctionObject,
	SettingsAreEqual,
	SettingsState,
	MapOverPatternParams,
	DeepSettingsMapParams,
	PatternMapFunctionParams,
}
