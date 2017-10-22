import { Frame } from '../../animation/types/Frame'
import { GetTileOriginAndSize, Unit } from '../../components'
import { Layer } from '../../execute'
import { Dimension } from '../../page'
import { Color, RenderTexture } from '../../render'
import { Radian } from '../../space'
import {
	AnimationSettings,
	ColorAssignment,
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
	ColorAssignmentPathShortcut,
	ColorPathShortcut,
	ColorSettingsPathShortcut,
	ColorsPathShortcut,
	DimensionPathShortcut,
	FramePathShortcut,
	GetTileOriginAndSizePathShortcut,
	GridSettingsPathShortcut,
	LayerPathShortcut,
	LayerSettingsPathShortcut,
	NumberPathShortcut,
	RadianPathShortcut,
	RenderTexturePathShortcut,
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
	(settingsPathShortcut: DimensionPathShortcut): Dimension
	(settingsPathShortcut: FramePathShortcut): Frame
	(settingsPathShortcut: LayerPathShortcut): Layer
	(settingsPathShortcut: NumberPathShortcut): number
	(settingsPathShortcut: RadianPathShortcut): Radian
	(settingsPathShortcut: RenderTexturePathShortcut): RenderTexture
	(settingsPathShortcut: UnitPathShortcut): Unit
	(settingsPathShortcut: AnimationSettingsPathShortcut): AnimationSettings
	(settingsPathShortcut: ColorSettingsPathShortcut): ColorSettings
	(settingsPathShortcut: ColorAssignmentPathShortcut): ColorAssignment
	(settingsPathShortcut: GridSettingsPathShortcut): GridSettings
	(settingsPathShortcut: LayerSettingsPathShortcut): LayerSettings
	(settingsPathShortcut: StripeCountContinuumSettingsPathShortcut): StripeCountContinuumSettings
	(settingsPathShortcut: StripePositionSettingsPathShortcut): StripePositionSettings
	(settingsPathShortcut: TextureSettingsPathShortcut): TextureSettings
	(settingsPathShortcut: TileSettingsPathShortcut): TileSettings
	(settingsPathShortcut: ViewSettingsPathShortcut): ViewSettings
	(settingsPathShortcut): any
}

export { GetFromBaseOrDefaultPattern }
