import { deeperPath } from './deeperPath'
import * as defaults from './defaults'
import { getFromBaseOrDefaultPattern } from './getFromBaseOrDefaultPattern'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import { resetState } from './resetState'
import {
	animationSettings,
	colorAssignmentSettings,
	colorSettings,
	gridSettings,
	layerSettings,
	stripeCountContinuumSettings,
	stripePositionSettings,
	textureSettings,
	tileSettings,
	viewSettings,
} from './settings'
import { Effect, Houndstooth, Pattern, SettingsPath, SettingsStep, State } from './types'

type AnimationSettings = animationSettings.AnimationSettings
type ColorAssignmentSettings = colorAssignmentSettings.ColorAssignmentSettings
type ColorSettings = colorSettings.ColorSettings
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
	ColorSettings,
	GridSettings,
	LayerSettings,
	StripeCountContinuumSettings,
	StripePositionSettings,
	TextureSettings,
	TileSettings,
	ViewSettings,
}
