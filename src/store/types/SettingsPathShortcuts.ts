// tslint:disable:max-file-line-count

import {
	AnimationSettingsPathShortcut,
	BooleanPathShortcuts as AnimationSettingsBooleanPathShortcuts,
	ColorPathShortcuts as AnimationSettingsColorPathShortcuts,
	ColorSetPathShortcuts as AnimationSettingsColorSetPathShortcuts,
	ColorsPathShortcuts as AnimationSettingsColorsPathShortcuts,
	ExecuteTexturePathShortcuts as AnimationSettingsExecuteTexturePathShortcuts,
	FramePathShortcuts as AnimationSettingsFramePathShortcuts,
	GetTileOriginAndSizePathShortcuts as AnimationSettingsGetTileOriginAndSizePathShortcuts,
	LayerPathShortcuts as AnimationSettingsLayerPathShortcuts,
	NumberPathShortcuts as AnimationSettingsNumberPathShortcuts,
	PxPathShortcuts as AnimationSettingsPxPathShortcuts,
	RadianPathShortcuts as AnimationSettingsRadianPathShortcuts,
	UnitPathShortcuts as AnimationSettingsUnitPathShortcuts,
} from './settings/AnimationSettings'
import {
	BooleanPathShortcuts as ColorSettingsBooleanPathShortcuts,
	ColorPathShortcuts as ColorSettingsColorPathShortcuts,
	ColorSetPathShortcuts as ColorSettingsColorSetPathShortcuts,
	ColorSettingsPathShortcut,
	ColorsPathShortcuts as ColorSettingsColorsPathShortcuts,
	ExecuteTexturePathShortcuts as ColorSettingsExecuteTexturePathShortcuts,
	FramePathShortcuts as ColorSettingsFramePathShortcuts,
	GetTileOriginAndSizePathShortcuts as ColorSettingsGetTileOriginAndSizePathShortcuts,
	LayerPathShortcuts as ColorSettingsLayerPathShortcuts,
	NumberPathShortcuts as ColorSettingsNumberPathShortcuts,
	PxPathShortcuts as ColorSettingsPxPathShortcuts,
	RadianPathShortcuts as ColorSettingsRadianPathShortcuts,
	UnitPathShortcuts as ColorSettingsUnitPathShortcuts,
} from './settings/ColorSettings'

type BooleanPathShortcuts =
	| AnimationSettingsBooleanPathShortcuts
	| ColorSettingsBooleanPathShortcuts
	| 'centerViewOnCenterOfTileAtHomeAddress'
	| 'collapseSameColoredShapesWithinTile'
	| 'flipGrain'
	| 'includeNegativeQuadrants'
	| 'zoomOnCanvasCenter'

type ColorPathShortcuts =
	| AnimationSettingsColorPathShortcuts
	| ColorSettingsColorPathShortcuts
	| 'backgroundColor'

type ColorsPathShortcuts =
	| AnimationSettingsColorsPathShortcuts
	| ColorSettingsColorsPathShortcuts
	| 'colorSet'

type ColorSetPathShortcuts =
	| AnimationSettingsColorSetPathShortcuts
	| ColorSettingsColorSetPathShortcuts

type ExecuteTexturePathShortcuts =
	| AnimationSettingsExecuteTexturePathShortcuts
	| ColorSettingsExecuteTexturePathShortcuts
	| 'executeTexture'

type FramePathShortcuts =
	| AnimationSettingsFramePathShortcuts
	| ColorSettingsFramePathShortcuts

type GetTileOriginAndSizePathShortcuts =
	| AnimationSettingsGetTileOriginAndSizePathShortcuts
	| ColorSettingsGetTileOriginAndSizePathShortcuts
	| 'getTileOriginAndSize'

type LayerPathShortcuts =
	| AnimationSettingsLayerPathShortcuts
	| ColorSettingsLayerPathShortcuts
	| 'endLayer'

type NumberPathShortcuts =
	| AnimationSettingsNumberPathShortcuts
	| ColorSettingsNumberPathShortcuts
	| 'gridSize'
	| 'stripeCount'
	| 'opacity'
	| 'zoom'

type PxPathShortcuts =
	| AnimationSettingsPxPathShortcuts
	| ColorSettingsPxPathShortcuts
	| 'canvasSize'

type RadianPathShortcuts =
	| AnimationSettingsRadianPathShortcuts
	| ColorSettingsRadianPathShortcuts
	| 'rotateViewAboutCanvasCenter'

type UnitPathShortcuts =
	| AnimationSettingsUnitPathShortcuts
	| ColorSettingsUnitPathShortcuts
	| 'tileSize'

type ColorAssignmentSettingsPathShortcut = 'colorAssignmentSettings'
type GridSettingsPathShortcut = 'gridSettings'
type LayerSettingsPathShortcut = 'layerSettings'
type StripeCountContinuumSettingsPathShortcut = 'stripeCountContinuumSettings'
type StripePositionSettingsPathShortcut = 'stripePositionSettings'
type TextureSettingsPathShortcut = 'textureSettings'
type TileSettingsPathShortcut = 'tileSettings'
type ViewSettingsPathShortcut = 'viewSettings'

export {
	// Settings type path shortcuts

	AnimationSettingsPathShortcut,
	ColorSettingsPathShortcut,
	ColorAssignmentSettingsPathShortcut,
	GridSettingsPathShortcut,
	LayerSettingsPathShortcut,
	StripeCountContinuumSettingsPathShortcut,
	StripePositionSettingsPathShortcut,
	TextureSettingsPathShortcut,
	TileSettingsPathShortcut,
	ViewSettingsPathShortcut,

	// General type path shortcuts

	BooleanPathShortcuts,
	ColorPathShortcuts,
	ColorsPathShortcuts,
	ColorSetPathShortcuts,
	ExecuteTexturePathShortcuts,
	FramePathShortcuts,
	GetTileOriginAndSizePathShortcuts,
	LayerPathShortcuts,
	NumberPathShortcuts,
	PxPathShortcuts,
	RadianPathShortcuts,
	UnitPathShortcuts,
}
