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
import {
	GridSettingsPathShortcut,
	GridSettingsTypePathShortcuts as GridSettings,
} from './settings/GridSettings'

type AssignmentModePathShortcuts =
	| AnimationSettings['AssignmentModePathShortcuts']
	| ColorSettings['AssignmentModePathShortcuts']
	| GridSettings['AssignmentModePathShortcuts']

type BooleanPathShortcuts =
	| AnimationSettings['BooleanPathShortcuts']
	| ColorSettings['BooleanPathShortcuts']
	| GridSettings['BooleanPathShortcuts']
	| 'centerViewOnCenterOfTileAtHomeAddress'
	| 'collapseSameColoredShapesWithinTile'
	| 'zoomOnCanvasCenter'

type ColorPathShortcuts =
	| AnimationSettings['ColorPathShortcuts']
	| ColorSettings['ColorPathShortcuts']
	| GridSettings['ColorPathShortcuts']

type ColorsPathShortcuts =
	| AnimationSettings['ColorsPathShortcuts']
	| ColorSettings['ColorsPathShortcuts']
	| GridSettings['ColorsPathShortcuts']

type ColorSetPathShortcuts =
	| AnimationSettings['ColorSetPathShortcuts']
	| ColorSettings['ColorSetPathShortcuts']
	| GridSettings['ColorSetPathShortcuts']

type ExecuteTexturePathShortcuts =
	| AnimationSettings['ExecuteTexturePathShortcuts']
	| ColorSettings['ExecuteTexturePathShortcuts']
	| GridSettings['ExecuteTexturePathShortcuts']
	| 'executeTexture'

type FramePathShortcuts =
	| AnimationSettings['FramePathShortcuts']
	| ColorSettings['FramePathShortcuts']
	| GridSettings['FramePathShortcuts']

type GetStripePositionsPathShortcuts =
	| AnimationSettings['GetStripePositionsPathShortcuts']
	| ColorSettings['GetStripePositionsPathShortcuts']
	| GridSettings['GetStripePositionsPathShortcuts']

type GetTileOriginAndSizePathShortcuts =
	| AnimationSettings['GetTileOriginAndSizePathShortcuts']
	| ColorSettings['GetTileOriginAndSizePathShortcuts']
	| GridSettings['GetTileOriginAndSizePathShortcuts']
	| 'getTileOriginAndSize'

type LayerPathShortcuts =
	| AnimationSettings['LayerPathShortcuts']
	| ColorSettings['LayerPathShortcuts']
	| GridSettings['LayerPathShortcuts']
	| 'endLayer'

type NumberPathShortcuts =
	| AnimationSettings['NumberPathShortcuts']
	| ColorSettings['NumberPathShortcuts']
	| GridSettings['NumberPathShortcuts']
	| 'stripeCount'
	| 'opacity'
	| 'zoom'

type OffsetAddressPathShortcuts =
	| AnimationSettings['OffsetAddressPathShortcuts']
	| ColorSettings['OffsetAddressPathShortcuts']
	| GridSettings['OffsetAddressPathShortcuts']

type PxPathShortcuts =
	| AnimationSettings['PxPathShortcuts']
	| ColorSettings['PxPathShortcuts']
	| GridSettings['PxPathShortcuts']
	| 'canvasSize'

type RadianPathShortcuts =
	| AnimationSettings['RadianPathShortcuts']
	| ColorSettings['RadianPathShortcuts']
	| GridSettings['RadianPathShortcuts']
	| 'rotateViewAboutCanvasCenter'

type StripeCountModePathShortcuts =
	| AnimationSettings['StripeCountModePathShortcuts']
	| ColorSettings['StripeCountModePathShortcuts']
	| GridSettings['StripeCountModePathShortcuts']

type SupertilePathShortcuts =
	| AnimationSettings['SupertilePathShortcuts']
	| ColorSettings['SupertilePathShortcuts']
	| GridSettings['SupertilePathShortcuts']

type TransformShapeColorIndicesPathShortcuts =
	| AnimationSettings['TransformShapeColorIndicesPathShortcuts']
	| ColorSettings['TransformShapeColorIndicesPathShortcuts']
	| GridSettings['TransformShapeColorIndicesPathShortcuts']

type UnitPathShortcuts =
	| AnimationSettings['UnitPathShortcuts']
	| ColorSettings['UnitPathShortcuts']
	| GridSettings['UnitPathShortcuts']
	| 'tileSize'

type WeavePathShortcuts =
	| AnimationSettings['WeavePathShortcuts']
	| ColorSettings['WeavePathShortcuts']
	| GridSettings['WeavePathShortcuts']

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
	GetStripePositionsPathShortcuts,
	GetTileOriginAndSizePathShortcuts,
	LayerPathShortcuts,
	NumberPathShortcuts,
	OffsetAddressPathShortcuts,
	PxPathShortcuts,
	RadianPathShortcuts,
	StripeCountModePathShortcuts,
	SupertilePathShortcuts,
	TransformShapeColorIndicesPathShortcuts,
	UnitPathShortcuts,
	WeavePathShortcuts,
}
