import { DEFAULT_PATTERN_STATE, FullPatternBaseValues, PatternFunctions } from '../../pattern'
import { Effect, Houndstooth, NamedEffect } from '../../types'
import { ObjectOf } from '../../utilities'
import { SettingsState } from './types'

const DEFAULT_ANIMATIONS_PATTERN: PatternFunctions = {}
const DEFAULT_BASE_PATTERN: FullPatternBaseValues = DEFAULT_PATTERN_STATE
const DEFAULT_LAYERS_PATTERN: PatternFunctions = {}

const DEFAULT_AVAILABLE_EFFECTS: ObjectOf<NamedEffect> = {}
const DEFAULT_COMBINED_EFFECTS: Effect = {}
const DEFAULT_CURRENT_PATTERN: FullPatternBaseValues = DEFAULT_PATTERN_STATE
const DEFAULT_MAIN_HOUNDSTOOTH: Houndstooth = {
	animationsPattern: DEFAULT_ANIMATIONS_PATTERN,
	basePattern: DEFAULT_BASE_PATTERN,
	layersPattern: DEFAULT_LAYERS_PATTERN,
}
const DEFAULT_OVERRIDES: Effect = {}

const DEFAULT_SETTINGS_STATE: SettingsState = {
	availableEffects: DEFAULT_AVAILABLE_EFFECTS,
	combinedEffects: DEFAULT_COMBINED_EFFECTS,
	currentPattern: DEFAULT_CURRENT_PATTERN,
	mainHoundstooth: DEFAULT_MAIN_HOUNDSTOOTH,
	overrides: DEFAULT_OVERRIDES,
}

export {
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,
	DEFAULT_MAIN_HOUNDSTOOTH,
	DEFAULT_OVERRIDES,
	DEFAULT_SETTINGS_STATE,
}
