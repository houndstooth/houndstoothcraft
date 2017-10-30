import { deeperPath } from './deeperPath'
import * as defaults from './defaults'
import { getFromBaseOrDefaultPattern } from './getFromBaseOrDefaultPattern'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import { resetState } from './resetState'
import {
	animationSettings,
	colorAssignmentSettings,
	gridSettings,
	layerSettings,
	stripeCountContinuumSettings,
	stripePositionSettings,
	textureSettings,
	tileSettings,
	viewSettings,
} from './settings'
import { BasePattern, Effect, Houndstooth, Pattern, PatternFunctions, SettingsPath, SettingsStep, State } from './types'

type AnimationSettings = animationSettings.AnimationSettings
type ColorAssignmentSettings = colorAssignmentSettings.ColorAssignmentSettings
type GridSettings = gridSettings.GridSettings
type LayerSettings = layerSettings.LayerSettings
type StripeCountContinuumSettings = stripeCountContinuumSettings.StripeCountContinuumSettings
type StripePositionSettings = stripePositionSettings.StripePositionSettings
type TextureSettings = textureSettings.TextureSettings
type TileSettings = tileSettings.TileSettings
type ViewSettings = viewSettings.ViewSettings

export {
	defaults,
	Effect,
	Pattern,
	BasePattern,
	PatternFunctions,
	Houndstooth,
	resetState,
	getFromBaseOrDefaultPattern,
	State,
	SettingsPath,
	SettingsStep,
	deeperPath,
	getSettingOrCreatePath,
	AnimationSettings,
	ColorAssignmentSettings,
	GridSettings,
	LayerSettings,
	StripeCountContinuumSettings,
	StripePositionSettings,
	TextureSettings,
	TileSettings,
	ViewSettings,
}
