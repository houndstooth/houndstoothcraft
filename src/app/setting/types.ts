import { FullPatternBaseValues } from '../../pattern'
import { Effect, Houndstooth, NamedEffect } from '../../types'
import { ObjectOf } from '../../utilities'

enum _SettingPathBrand {}
type SettingPath = _SettingPathBrand & SettingStep[]

enum _SettingStepBrand {}
type SettingStep = _SettingStepBrand & string

interface SettingsState {
	availableEffects: ObjectOf<NamedEffect>,
	combinedEffects: Effect,
	currentPattern: FullPatternBaseValues,
	mainHoundstooth: Houndstooth,
	overrides: Effect,
}

export {
	SettingPath,
	SettingsState,
	SettingStep,
}
