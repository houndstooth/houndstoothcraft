// tslint:disable:no-any max-file-line-count

import { PageElement } from '../page/types'
import { Effect, SettingsPath, SettingsStep } from '../store'
import { Pattern } from '../store/types'
import { NullarySideEffector } from '../utilities/types'

interface BuildWarningMessageParams extends FullSettingsPath, SettingOverride {
}

interface ComposeMainHoundstooth {
	readonly houndstoothEffects?: Effect[],
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
	readonly patternToMerge?: {},
	readonly settingsPath?: SettingsPath,
	readonly warnAboutConflicts?: boolean,
}

interface ExecuteAnimationParams {
	readonly animationFunctionObjects: SettingsFunctionObject[],
	readonly layerFunctionObjects: SettingsFunctionObject[]
}

interface ExecuteLayerParams {
	readonly layer: Layer,
	readonly layerFunctionObjects: SettingsFunctionObject[],
	readonly startLayer: Layer,
}

interface FullSettingsPath {
	readonly settingName: SettingsStep,
	readonly settingsPath: SettingsPath,
}

type FunctionsOf<T> = { [P in keyof T]: (previous: T[P]) => T[P] }

interface Layer extends Number {
	_LayerBrand: any,
}

interface MaybeWarnAboutConflictsParams extends FullSettingsPath, ShouldWarnAboutConflictsParams {
}

interface PrepareFunctionObjectForSettingOrMaybeRecurseParams extends FullSettingsPath {
	readonly maybeSettingsFunctionsSourcePattern: any,
	readonly settingsFunctionObjects: SettingsFunctionObject[],
}

interface PrepareFunctionObjectsParams {
	readonly settingsFunctionObjects?: SettingsFunctionObject[],
	readonly settingsFunctionsSourcePattern: any,
	readonly settingsPath?: SettingsPath,
}

interface SettingOverride {
	readonly existingSetting: any,
	readonly overridingSetting: any,
}

type SettingsFunction<T> = (p: T) => T

interface SettingsFunctionObject extends FullSettingsPath {
	readonly settingsFunction: SettingsFunction<any>,
}

interface ShouldWarnAboutConflictsParams extends SettingOverride {
	readonly warnAboutConflicts: boolean,
}

interface BuildGridProgressIntervalFunctionParams {
	progressBar?: PageElement,
}

export {
	BuildGridProgressIntervalFunctionParams,
	BuildWarningMessageParams,
	ComposeMainHoundstooth,
	ComposePatternParams,
	ComposePatternsParams,
	ExecuteAnimationParams,
	ExecuteLayerParams,
	FullSettingsPath,
	FunctionsOf,
	Layer,
	MaybeWarnAboutConflictsParams,
	PrepareFunctionObjectForSettingOrMaybeRecurseParams,
	PrepareFunctionObjectsParams,
	SettingsFunction,
	SettingsFunctionObject,
	ShouldWarnAboutConflictsParams,
}
