import { deeperPath } from './deeperPath'
import * as defaults from './defaults'
import { getFromBaseOrDefaultPattern } from './getFromBaseOrDefaultPattern'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import { resetState } from './resetState'
import {
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
} from './settings'
import {
	Effect,
	Houndstooth,
	Pattern,
	SettingsPath,
	SettingsStep,
	State,
} from './types'

type _AnimationSettings = AnimationSettings.AnimationSettings
type _ColorAssignmentSettings = ColorAssignmentSettings.ColorAssignmentSettings
type _ColorSettings = ColorSettings.ColorSettings
type _GridSettings = GridSettings.GridSettings
type _LayerSettings = LayerSettings.LayerSettings
type _StripeCountContinuumSettings = StripeCountContinuumSettings.StripeCountContinuumSettings
type _StripePositionSettings = StripePositionSettings.StripePositionSettings
type _TextureSettings = TextureSettings.TextureSettings
type _TileSettings = TileSettings.TileSettings
type _ViewSettings = ViewSettings.ViewSettings

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
	_AnimationSettings as AnimationSettings,
	_ColorAssignmentSettings as ColorAssignmentSettings,
	_ColorSettings as ColorSettings,
	_GridSettings as GridSettings,
	_LayerSettings as LayerSettings,
	_StripeCountContinuumSettings as StripeCountContinuumSettings,
	_StripePositionSettings as StripePositionSettings,
	_TextureSettings as TextureSettings,
	_TileSettings as TileSettings,
	_ViewSettings as ViewSettings,
}
