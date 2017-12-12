import { DEFAULT_PATTERN_STATE, FullPatternBaseValues, PatternFunctions } from '../../pattern'
import { Houndstooth, NamedEffect } from '../../types'
import { SettingsState } from './types'

const DEFAULT_ANIMATIONS_PATTERN: PatternFunctions = {}
const DEFAULT_BASE_PATTERN: FullPatternBaseValues = DEFAULT_PATTERN_STATE
const DEFAULT_LAYERS_PATTERN: PatternFunctions = {}

const DEFAULT_AVAILABLE_EFFECTS: NamedEffect[] = []
const DEFAULT_CURRENT_PATTERN: FullPatternBaseValues = DEFAULT_PATTERN_STATE
const DEFAULT_MAIN_HOUNDSTOOTH: Houndstooth = {
	animationsPattern: DEFAULT_ANIMATIONS_PATTERN,
	basePattern: DEFAULT_BASE_PATTERN,
	layersPattern: DEFAULT_LAYERS_PATTERN,
}

const DEFAULT_SETTINGS_STATE: SettingsState = {
	availableEffects: DEFAULT_AVAILABLE_EFFECTS,
	currentPattern: DEFAULT_CURRENT_PATTERN,
	mainHoundstooth: DEFAULT_MAIN_HOUNDSTOOTH,
}

export {
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_LAYERS_PATTERN,
	DEFAULT_MAIN_HOUNDSTOOTH,
	DEFAULT_SETTINGS_STATE,
}
