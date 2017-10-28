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

interface SetSetting {
	// Settings type path shortcuts

	(settingsPathShortcut: AnimationSettingsPathShortcut, value: AnimationSettings): void
	(settingsPathShortcut: ColorSettingsPathShortcut, value: ColorSettings): void
	(settingsPathShortcut: ColorAssignmentSettingsPathShortcut, value: ColorAssignmentSettings): void
	(settingsPathShortcut: GridSettingsPathShortcut, value: GridSettings): void
	(settingsPathShortcut: LayerSettingsPathShortcut, value: LayerSettings): void
	(settingsPathShortcut: StripeCountContinuumSettingsPathShortcut, value: StripeCountContinuumSettings): void
	(settingsPathShortcut: StripePositionSettingsPathShortcut, value: StripePositionSettings): void
	(settingsPathShortcut: TextureSettingsPathShortcut, value: TextureSettings): void
	(settingsPathShortcut: TileSettingsPathShortcut, value: TileSettings): void
	(settingsPathShortcut: ViewSettingsPathShortcut, value: ViewSettings): void
	(settingsPathShortcut: ViewSettingsPathShortcut, value: ViewSettings): void

	// General type path shortcuts

	(settingsPathShortcut: GetTileOriginAndSizePathShortcuts, value: GetTileOriginAndSize): void
	(settingsPathShortcut: BooleanPathShortcuts, value: boolean): void
	(settingsPathShortcut: ColorPathShortcuts, value: Color): void
	(settingsPathShortcut: ColorsPathShortcuts, value: Color[]): void
	(settingsPathShortcut: PxPathShortcuts, value: Px): void
	(settingsPathShortcut: FramePathShortcuts, value: Frame): void
	(settingsPathShortcut: LayerPathShortcuts, value: Layer): void
	(settingsPathShortcut: NumberPathShortcuts, value: number): void
	(settingsPathShortcut: RadianPathShortcuts, value: Radian): void
	(settingsPathShortcut: ExecuteTexturePathShortcuts, value: ExecuteTexture): void
	(settingsPathShortcut: UnitPathShortcuts, value: Unit): void
}

export { SetSetting }
