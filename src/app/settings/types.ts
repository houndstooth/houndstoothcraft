// tslint:disable:no-any

import { Effect, NamedEffect, Pattern } from '../../pattern'

type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Overwrite<T, U> = { [P in Diff<keyof T, keyof U>]: T[P] } & U;

enum _SettingsPathBrand {}

type SettingsPath = _SettingsPathBrand & SettingsStep[]

enum _SettingsStepBrand {}

type SettingsStep = _SettingsStepBrand & string;

interface SettingNamesToPathsMap { [ index: string ]: SettingsPath }

interface BuildSettingNamesToPathsMapParams {
	// tslint:disable-next-line:no-any
	settings?: any,
	settingsPath?: SettingsPath,
}

interface CheckSettingForConflict extends FullSettingsPath, SettingConflictCheck {
}

interface PatternsHaveConflictsParams {
	readonly pattern?: Pattern,
	readonly patternCheckingAgainst?: Pattern,
	readonly settingsPath?: SettingsPath,
}

interface SettingConflictCheck {
	readonly setting: any,
	readonly settingCheckingForConflict: any,
}

interface ComposeMainHoundstooth {
	readonly effects?: NamedEffect[],
	readonly logComposedMainHoundstooth?: boolean,
	readonly overrides?: Effect,
}

interface ComposePatternParams {
	patternDefaults: Pattern,
	patternEffects?: Pattern,
	patternOverrides?: Pattern,
	patternToCompose: Pattern,
}

interface ComposePatternsParams {
	readonly patternToBeMergedOnto: Pattern,
	readonly patternToMerge?: any,
	readonly settingsPath?: SettingsPath,
}

interface FullSettingsPath {
	readonly settingName: SettingsStep,
	readonly settingsPath: SettingsPath,
}

type FunctionsOf<T> = { [P in keyof T]: () => T[P] }

interface PrepareFunctionObjectForSettingOrMaybeRecurseParams extends FullSettingsPath {
	readonly maybeSettingsFunctionsSourcePattern: any,
	readonly settingsFunctionObjects: SettingsFunctionObject[],
}

interface PrepareFunctionObjectsParams {
	readonly settingsFunctionObjects?: SettingsFunctionObject[],
	readonly settingsFunctionsSourcePattern: any,
	readonly settingsPath?: SettingsPath,
}

type SettingsFunction<T> = () => T

interface SettingsFunctionObject extends FullSettingsPath {
	readonly settingsFunction: SettingsFunction<any>,
}

type SettingsAreEqual = (a: any, b: any) => boolean

export {
	SettingsPath,
	SettingsStep,
	SettingNamesToPathsMap,
	BuildSettingNamesToPathsMapParams,
	Overwrite,
	CheckSettingForConflict,
	PatternsHaveConflictsParams,
	SettingConflictCheck,
	ComposeMainHoundstooth,
	ComposePatternParams,
	ComposePatternsParams,
	FullSettingsPath,
	FunctionsOf,
	PrepareFunctionObjectForSettingOrMaybeRecurseParams,
	PrepareFunctionObjectsParams,
	SettingsFunction,
	SettingsFunctionObject,
	SettingsAreEqual,
}
