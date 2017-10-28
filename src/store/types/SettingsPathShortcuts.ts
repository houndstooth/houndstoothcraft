// tslint:disable:max-file-line-count

import {
	AnimationSettingsPathShortcut,
	TypePathShortcuts as AnimationSettings,
} from './settings/AnimationSettings'
import {
	ColorAssignmentSettingsPathShortcut,
	ColorSettingsPathShortcut,
	TypePathShortcuts as ColorSettings,
} from './settings/ColorSettings'

type BooleanPathShortcuts =
	| AnimationSettings.BooleanPathShortcuts
	| ColorSettings.BooleanPathShortcuts
	| 'centerViewOnCenterOfTileAtHomeAddress'
	| 'collapseSameColoredShapesWithinTile'
	| 'includeNegativeQuadrants'
	| 'zoomOnCanvasCenter'

type ColorPathShortcuts =
	| AnimationSettings.ColorPathShortcuts
	| ColorSettings.ColorPathShortcuts

type ColorsPathShortcuts =
	| AnimationSettings.ColorsPathShortcuts
	| ColorSettings.ColorsPathShortcuts

type ColorSetPathShortcuts =
	| AnimationSettings.ColorSetPathShortcuts
	| ColorSettings.ColorSetPathShortcuts

type ExecuteTexturePathShortcuts =
	| AnimationSettings.ExecuteTexturePathShortcuts
	| ColorSettings.ExecuteTexturePathShortcuts
	| 'executeTexture'

type FramePathShortcuts =
	| AnimationSettings.FramePathShortcuts
	| ColorSettings.FramePathShortcuts

type GetTileOriginAndSizePathShortcuts =
	| AnimationSettings.GetTileOriginAndSizePathShortcuts
	| ColorSettings.GetTileOriginAndSizePathShortcuts
	| 'getTileOriginAndSize'

type LayerPathShortcuts =
	| AnimationSettings.LayerPathShortcuts
	| ColorSettings.LayerPathShortcuts
	| 'endLayer'

type NumberPathShortcuts =
	| AnimationSettings.NumberPathShortcuts
	| ColorSettings.NumberPathShortcuts
	| 'gridSize'
	| 'stripeCount'
	| 'opacity'
	| 'zoom'

type PxPathShortcuts =
	| AnimationSettings.PxPathShortcuts
	| ColorSettings.PxPathShortcuts
	| 'canvasSize'

type RadianPathShortcuts =
	| AnimationSettings.RadianPathShortcuts
	| ColorSettings.RadianPathShortcuts
	| 'rotateViewAboutCanvasCenter'

type UnitPathShortcuts =
	| AnimationSettings.UnitPathShortcuts
	| ColorSettings.UnitPathShortcuts
	| 'tileSize'

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
