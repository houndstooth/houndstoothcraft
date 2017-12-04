// tslint:disable:no-any max-file-line-count

import { Effect, NamedEffect, Pattern } from '../../pattern'
import { SettingsPath, SettingsStep } from '../settings'

interface ComposeMainHoundstooth {
	readonly houndstoothEffects?: NamedEffect[],
	readonly houndstoothOverrides?: Effect,
	readonly logComposedMainHoundstooth?: boolean,
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

export {
	ComposeMainHoundstooth,
	ComposePatternParams,
	ComposePatternsParams,
	FullSettingsPath,
	FunctionsOf,
	PrepareFunctionObjectForSettingOrMaybeRecurseParams,
	PrepareFunctionObjectsParams,
	SettingsFunction,
	SettingsFunctionObject,
}
