// Settings type imports

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

// General type imports

import { Frame } from '../../animation'
import { ExecuteTexture, GetTileOriginAndSize, Unit } from '../../components'
import { Layer } from '../../execute'
import { Px } from '../../page'
import { Color } from '../../render'
import { Radian } from '../../space'

import {
	// Settings type path shortcuts

	AnimationSettingsPathShortcut,
	BooleanPathShortcuts,
	ColorAssignmentSettingsPathShortcut,
	ColorPathShortcuts,
	ColorSettingsPathShortcut,
	ColorsPathShortcuts,
	ExecuteTexturePathShortcuts,
	FramePathShortcuts,
	GetTileOriginAndSizePathShortcuts,
	GridSettingsPathShortcut,

	// General type path shortcuts

	LayerPathShortcuts,
	LayerSettingsPathShortcut,
	NumberPathShortcuts,
	PxPathShortcuts,
	RadianPathShortcuts,
	StripeCountContinuumSettingsPathShortcut,
	StripePositionSettingsPathShortcut,
	TextureSettingsPathShortcut,
	TileSettingsPathShortcut,
	UnitPathShortcuts,
	ViewSettingsPathShortcut,
} from './SettingsPathShortcuts'

interface GetFromBaseOrDefaultPattern {
	// Settings type path shortcuts

	(settingsPathShortcut: AnimationSettingsPathShortcut): AnimationSettings
	(settingsPathShortcut: ColorSettingsPathShortcut): ColorSettings
	(settingsPathShortcut: ColorAssignmentSettingsPathShortcut): ColorAssignmentSettings
	(settingsPathShortcut: GridSettingsPathShortcut): GridSettings
	(settingsPathShortcut: LayerSettingsPathShortcut): LayerSettings
	(settingsPathShortcut: StripeCountContinuumSettingsPathShortcut): StripeCountContinuumSettings
	(settingsPathShortcut: StripePositionSettingsPathShortcut): StripePositionSettings
	(settingsPathShortcut: TextureSettingsPathShortcut): TextureSettings
	(settingsPathShortcut: TileSettingsPathShortcut): TileSettings
	(settingsPathShortcut: ViewSettingsPathShortcut): ViewSettings

	// General type path shortcuts

	(settingsPathShortcut: BooleanPathShortcuts): boolean
	(settingsPathShortcut: ColorPathShortcuts): Color
	(settingsPathShortcut: ColorsPathShortcuts): Color[]
	(settingsPathShortcut: ExecuteTexturePathShortcuts): ExecuteTexture
	(settingsPathShortcut: FramePathShortcuts): Frame
	(settingsPathShortcut: GetTileOriginAndSizePathShortcuts): GetTileOriginAndSize
	(settingsPathShortcut: LayerPathShortcuts): Layer
	(settingsPathShortcut: NumberPathShortcuts): number
	(settingsPathShortcut: PxPathShortcuts): Px
	(settingsPathShortcut: RadianPathShortcuts): Radian
	(settingsPathShortcut: UnitPathShortcuts): Unit
}

export { GetFromBaseOrDefaultPattern }
