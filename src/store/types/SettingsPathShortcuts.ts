// tslint:disable:max-file-line-count

import {
	AnimationSettingsPathShortcut,
	AnimationSettingsTypePathShortcuts as AnimationSettings,
} from './settings/AnimationSettings'
import {
	ColorAssignmentSettingsPathShortcut,
	ColorAssignmentSettingsTypePathShortcuts as ColorAssignmentSettings,
	ColorSettingsPathShortcut,
	ColorSettingsTypePathShortcuts as ColorSettings,
} from './settings/ColorSettings'

type BooleanPathShortcuts =
	| AnimationSettings['BooleanPathShortcuts']
	| ColorAssignmentSettings['BooleanPathShortcuts']
	| ColorSettings['BooleanPathShortcuts']
	| 'centerViewOnCenterOfTileAtHomeAddress'
	| 'collapseSameColoredShapesWithinTile'
	| 'includeNegativeQuadrants'
	| 'zoomOnCanvasCenter'

type ColorPathShortcuts =
	| AnimationSettings['ColorPathShortcuts']
	| ColorAssignmentSettings['ColorPathShortcuts']
	| ColorSettings['ColorPathShortcuts']

type ColorsPathShortcuts =
	| AnimationSettings['ColorsPathShortcuts']
	| ColorAssignmentSettings['ColorsPathShortcuts']
	| ColorSettings['ColorsPathShortcuts']

type ColorSetPathShortcuts =
	| AnimationSettings['ColorSetPathShortcuts']
	| ColorAssignmentSettings['ColorSetPathShortcuts']
	| ColorSettings['ColorSetPathShortcuts']

type ExecuteTexturePathShortcuts =
	| AnimationSettings['ExecuteTexturePathShortcuts']
	| ColorAssignmentSettings['ExecuteTexturePathShortcuts']
	| ColorSettings['ExecuteTexturePathShortcuts']
	| 'executeTexture'

type FramePathShortcuts =
	| AnimationSettings['FramePathShortcuts']
	| ColorAssignmentSettings['FramePathShortcuts']
	| ColorSettings['FramePathShortcuts']

type GetTileOriginAndSizePathShortcuts =
	| AnimationSettings['GetTileOriginAndSizePathShortcuts']
	| ColorAssignmentSettings['GetTileOriginAndSizePathShortcuts']
	| ColorSettings['GetTileOriginAndSizePathShortcuts']
	| 'getTileOriginAndSize'

type LayerPathShortcuts =
	| AnimationSettings['LayerPathShortcuts']
	| ColorAssignmentSettings['LayerPathShortcuts']
	| ColorSettings['LayerPathShortcuts']
	| 'endLayer'

type NumberPathShortcuts =
	| AnimationSettings['NumberPathShortcuts']
	| ColorAssignmentSettings['NumberPathShortcuts']
	| ColorSettings['NumberPathShortcuts']
	| 'gridSize'
	| 'stripeCount'
	| 'opacity'
	| 'zoom'

type PxPathShortcuts =
	| AnimationSettings['PxPathShortcuts']
	| ColorAssignmentSettings['PxPathShortcuts']
	| ColorSettings['PxPathShortcuts']
	| 'canvasSize'

type RadianPathShortcuts =
	| AnimationSettings['RadianPathShortcuts']
	| ColorAssignmentSettings['RadianPathShortcuts']
	| ColorSettings['RadianPathShortcuts']
	| 'rotateViewAboutCanvasCenter'

type UnitPathShortcuts =
	| AnimationSettings['UnitPathShortcuts']
	| ColorAssignmentSettings['UnitPathShortcuts']
	| ColorSettings['UnitPathShortcuts']
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
