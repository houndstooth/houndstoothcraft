// tslint:disable:max-file-line-count

import {
	AnimationSettingsPathShortcut,
	BooleanPathShortcuts as AnimationSettingsBooleanPathShortcuts,
	ColorPathShortcuts as AnimationSettingsColorPathShortcuts,
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

type BooleanPathShortcuts =
	| AnimationSettingsBooleanPathShortcuts
	| 'centerViewOnCenterOfTileAtHomeAddress'
	| 'collapseSameColoredShapesWithinTile'
	| 'flipGrain'
	| 'includeNegativeQuadrants'
	| 'zoomOnCanvasCenter'

type ColorPathShortcuts =
	| AnimationSettingsColorPathShortcuts
	| 'backgroundColor'

type ColorsPathShortcuts =
	| AnimationSettingsColorsPathShortcuts
	| 'colorSet'

type ExecuteTexturePathShortcuts =
	| AnimationSettingsExecuteTexturePathShortcuts
	| 'executeTexture'

type FramePathShortcuts =
	| AnimationSettingsFramePathShortcuts

type GetTileOriginAndSizePathShortcuts =
	| AnimationSettingsGetTileOriginAndSizePathShortcuts
	| 'getTileOriginAndSize'

type LayerPathShortcuts =
	| AnimationSettingsLayerPathShortcuts
	| 'endLayer'

type NumberPathShortcuts =
	| AnimationSettingsNumberPathShortcuts
	| 'gridSize'
	| 'stripeCount'
	| 'opacity'
	| 'zoom'

type PxPathShortcuts =
	| AnimationSettingsPxPathShortcuts
	| 'canvasSize'

type RadianPathShortcuts =
	| AnimationSettingsRadianPathShortcuts
	| 'rotateViewAboutCanvasCenter'

type UnitPathShortcuts =
	| AnimationSettingsUnitPathShortcuts
	| 'tileSize'

type ColorSettingsPathShortcut = 'colorSettings'
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
	ExecuteTexturePathShortcuts,
	FramePathShortcuts,
	GetTileOriginAndSizePathShortcuts,
	LayerPathShortcuts,
	NumberPathShortcuts,
	PxPathShortcuts,
	RadianPathShortcuts,
	UnitPathShortcuts,
}
