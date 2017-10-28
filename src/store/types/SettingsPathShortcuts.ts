// tslint:disable:max-file-line-count

import {
	AnimationSettingsPathShortcut,
	AnimationSettingsTypePathShortcuts as AnimationSettings,
} from './settings/AnimationSettings'
import {
	ColorAssignmentSettingsPathShortcut,
	ColorSettingsPathShortcut,
	ColorSettingsTypePathShortcuts as ColorSettings,
} from './settings/ColorSettings'

type AssignmentModePathShortcuts =
	| AnimationSettings['AssignmentModePathShortcuts']
	| ColorSettings['AssignmentModePathShortcuts']

type BooleanPathShortcuts =
	| AnimationSettings['BooleanPathShortcuts']
	| ColorSettings['BooleanPathShortcuts']
	| 'centerViewOnCenterOfTileAtHomeAddress'
	| 'collapseSameColoredShapesWithinTile'
	| 'includeNegativeQuadrants'
	| 'zoomOnCanvasCenter'

type ColorPathShortcuts =
	| AnimationSettings['ColorPathShortcuts']
	| ColorSettings['ColorPathShortcuts']

type ColorsPathShortcuts =
	| AnimationSettings['ColorsPathShortcuts']
	| ColorSettings['ColorsPathShortcuts']

type ColorSetPathShortcuts =
	| AnimationSettings['ColorSetPathShortcuts']
	| ColorSettings['ColorSetPathShortcuts']

type ExecuteTexturePathShortcuts =
	| AnimationSettings['ExecuteTexturePathShortcuts']
	| ColorSettings['ExecuteTexturePathShortcuts']
	| 'executeTexture'

type FramePathShortcuts =
	| AnimationSettings['FramePathShortcuts']
	| ColorSettings['FramePathShortcuts']

type GetTileOriginAndSizePathShortcuts =
	| AnimationSettings['GetTileOriginAndSizePathShortcuts']
	| ColorSettings['GetTileOriginAndSizePathShortcuts']
	| 'getTileOriginAndSize'

type LayerPathShortcuts =
	| AnimationSettings['LayerPathShortcuts']
	| ColorSettings['LayerPathShortcuts']
	| 'endLayer'

type NumberPathShortcuts =
	| AnimationSettings['NumberPathShortcuts']
	| ColorSettings['NumberPathShortcuts']
	| 'gridSize'
	| 'stripeCount'
	| 'opacity'
	| 'zoom'

type OffsetAddressPathShortcuts =
	| AnimationSettings['OffsetAddressPathShortcuts']
	| ColorSettings['OffsetAddressPathShortcuts']

type PxPathShortcuts =
	| AnimationSettings['PxPathShortcuts']
	| ColorSettings['PxPathShortcuts']
	| 'canvasSize'

type RadianPathShortcuts =
	| AnimationSettings['RadianPathShortcuts']
	| ColorSettings['RadianPathShortcuts']
	| 'rotateViewAboutCanvasCenter'

type SupertilePathShortcuts =
	| AnimationSettings['SupertilePathShortcuts']
	| ColorSettings['SupertilePathShortcuts']

type TransformShapeColorIndicesPathShortcuts =
	| AnimationSettings['TransformShapeColorIndicesPathShortcuts']
	| ColorSettings['TransformShapeColorIndicesPathShortcuts']

type UnitPathShortcuts =
	| AnimationSettings['UnitPathShortcuts']
	| ColorSettings['UnitPathShortcuts']
	| 'tileSize'

type WeavePathShortcuts =
	| AnimationSettings['WeavePathShortcuts']
	| ColorSettings['WeavePathShortcuts']

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

	AssignmentModePathShortcuts,
	BooleanPathShortcuts,
	ColorPathShortcuts,
	ColorsPathShortcuts,
	ColorSetPathShortcuts,
	ExecuteTexturePathShortcuts,
	FramePathShortcuts,
	GetTileOriginAndSizePathShortcuts,
	LayerPathShortcuts,
	NumberPathShortcuts,
	OffsetAddressPathShortcuts,
	PxPathShortcuts,
	RadianPathShortcuts,
	SupertilePathShortcuts,
	TransformShapeColorIndicesPathShortcuts,
	UnitPathShortcuts,
	WeavePathShortcuts,
}
