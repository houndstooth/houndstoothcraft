import { Frame } from '../../animation/types/Frame'
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

interface GetFromBaseOrDefaultPattern {
	(settingsPathShortcut: GetTileOriginAndSizePathShortcut): GetTileOriginAndSize
	(settingsPathShortcut: BooleanPathShortcut): boolean
	(settingsPathShortcut: ColorPathShortcut): Color
	(settingsPathShortcut: ColorsPathShortcut): Color[]
	(settingsPathShortcut: PxPathShortcut): Px
	(settingsPathShortcut: FramePathShortcut): Frame
	(settingsPathShortcut: LayerPathShortcut): Layer
	(settingsPathShortcut: NumberPathShortcut): number
	(settingsPathShortcut: RadianPathShortcut): Radian
	(settingsPathShortcut: ExecuteTexturePathShortcut): ExecuteTexture
	(settingsPathShortcut: UnitPathShortcut): Unit
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
}

export { GetFromBaseOrDefaultPattern }
