import { deeperPath } from './deeperPath'
import * as defaults from './defaults'
import { getFromBaseOrDefaultPattern } from './getFromBaseOrDefaultPattern'
import { getSettingOrCreatePath } from './getSettingOrCreatePath'
import { resetState } from './resetState'
import * as paths from './settingsPaths'
import {
	AnimationSettings,
	ColorAssignment,
	ColorSettings,
	Effect,
	GridSettings,
	Houndstooth,
	LayerSettings,
	Pattern,
	SettingsPath,
	SettingsStep,
	State,
	StripeCountContinuumSettings,
	StripePositionSettings,
	TextureSettings,
	TileSettings,
	ViewSettings,
} from './types'

export {
	defaults,
	paths,
	Effect,
	Pattern,
	Houndstooth,
	resetState,
	ColorAssignment,
	getFromBaseOrDefaultPattern,
	StripeCountContinuumSettings,
	ColorSettings,
	GridSettings,
	TextureSettings,
	ViewSettings,
	TileSettings,
	StripePositionSettings,
	LayerSettings,
	AnimationSettings,
	State,
	SettingsPath,
	SettingsStep,
	deeperPath,
	getSettingOrCreatePath,
}
