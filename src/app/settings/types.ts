// tslint:disable:no-any max-file-line-count

import { FullPatternBaseValues } from '../../pattern'
import { Effect, Houndstooth, NamedEffect, Pattern } from '../../types'
import { ObjectOf } from '../../utilities'

enum _SettingsPathBrand {}

type SettingsPath = _SettingsPathBrand & SettingsStep[]

enum _SettingsStepBrand {}

type SettingsStep = _SettingsStepBrand & string;

interface CheckSettingForConflict extends FullSettingsPath, SettingConflictCheck {
}

interface PatternsHaveConflictsParams {
	pattern?: Pattern,
	patternCheckingAgainst?: Pattern,
	settingsPath?: SettingsPath,
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
	settingsPath?: SettingsPath,
}

interface FullSettingsPath {
	settingName: SettingsStep,
	settingsPath: SettingsPath,
}

interface PrepareFunctionObjectForSettingOrMaybeRecurseParams extends FullSettingsPath {
	maybeSettingsFunctionsSourcePattern: any,
	settingsFunctionObjects: SettingsFunctionObject[],
}

interface PrepareFunctionObjectsParams {
	settingsFunctionObjects?: SettingsFunctionObject[],
	settingsFunctionsSourcePattern: any,
	settingsPath?: SettingsPath,
}

type SettingsFunction<T> = (_?: T) => T

interface SettingsFunctionObject extends FullSettingsPath {
	settingsFunction: SettingsFunction<any>,
}

type SettingsAreEqual = (a: any, b: any) => boolean

interface SettingsState {
	availableEffects: ObjectOf<NamedEffect>,
	currentPattern: FullPatternBaseValues,
	mainHoundstooth: Houndstooth,
	overrides: Effect,
}

export {
	SettingsPath,
	SettingsStep,
	CheckSettingForConflict,
	PatternsHaveConflictsParams,
	SettingConflictCheck,
	ComposePatternParams,
	ComposePatternsParams,
	FullSettingsPath,
	PrepareFunctionObjectForSettingOrMaybeRecurseParams,
	PrepareFunctionObjectsParams,
	SettingsFunction,
	SettingsFunctionObject,
	SettingsAreEqual,
	SettingsState,
}
