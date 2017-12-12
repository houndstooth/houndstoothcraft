// tslint:disable:no-any max-file-line-count

import { FullPatternBaseValues } from '../../pattern'
import { Effect, Houndstooth, NamedEffect, Pattern } from '../../types'

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

interface ComposeMainHoundstoothParams {
	effects?: NamedEffect[],
	logComposedMainHoundstooth?: boolean,
	overrides?: Effect,
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
	availableEffects: NamedEffect[],
	currentPattern: FullPatternBaseValues,
	mainHoundstooth: Houndstooth,
}

export {
	SettingsPath,
	SettingsStep,
	CheckSettingForConflict,
	PatternsHaveConflictsParams,
	SettingConflictCheck,
	ComposeMainHoundstoothParams,
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
