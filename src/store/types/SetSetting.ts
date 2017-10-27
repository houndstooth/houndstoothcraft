import { Frame } from '../../animation'
import { ExecuteTexture, GetTileOriginAndSize, Unit } from '../../components'
import { Layer } from '../../execute'
import { Px } from '../../page'
import { Color } from '../../render'
import { Radian } from '../../space'
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
	AnimationSettingsPathShortcut,
	BooleanPathShortcut,
	ColorAssignmentSettingsPathShortcut,
	ColorPathShortcut,
	ColorSettingsPathShortcut,
	ColorsPathShortcut,
	ExecuteTexturePathShortcut,
	FramePathShortcut,
	GetTileOriginAndSizePathShortcut,
	GridSettingsPathShortcut,
	LayerPathShortcut,
	LayerSettingsPathShortcut,
	NumberPathShortcut,
	PxPathShortcut,
	RadianPathShortcut,
	StripeCountContinuumSettingsPathShortcut,
	StripePositionSettingsPathShortcut,
	TextureSettingsPathShortcut,
	TileSettingsPathShortcut,
	UnitPathShortcut,
	ViewSettingsPathShortcut,
} from './SettingsPathShortcuts'

interface SetSetting {
	(settingsPathShortcut: GetTileOriginAndSizePathShortcut, value: GetTileOriginAndSize): void
	(settingsPathShortcut: BooleanPathShortcut, value: boolean): void
	(settingsPathShortcut: ColorPathShortcut, value: Color): void
	(settingsPathShortcut: ColorsPathShortcut, value: Color[]): void
	(settingsPathShortcut: PxPathShortcut, value: Px): void
	(settingsPathShortcut: FramePathShortcut, value: Frame): void
	(settingsPathShortcut: LayerPathShortcut, value: Layer): void
	(settingsPathShortcut: NumberPathShortcut, value: number): void
	(settingsPathShortcut: RadianPathShortcut, value: Radian): void
	(settingsPathShortcut: ExecuteTexturePathShortcut, value: ExecuteTexture): void
	(settingsPathShortcut: UnitPathShortcut, value: Unit): void
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
}

export { SetSetting }
