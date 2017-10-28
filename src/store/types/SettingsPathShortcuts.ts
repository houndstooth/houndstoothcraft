// tslint:disable:max-file-line-count max-line-length

import { AnimationSettingsPathShortcut, AnimationSettingsTypePathShortcuts as AnimationSettings } from './settings/AnimationSettings'
import { ColorAssignmentSettingsPathShortcut, ColorSettingsPathShortcut, ColorSettingsTypePathShortcuts as ColorSettings } from './settings/ColorSettings'
import { GridSettingsPathShortcut, GridSettingsTypePathShortcuts as GridSettings } from './settings/GridSettings'
import { LayerSettingsPathShortcut, LayerSettingsTypePathShortcuts as LayerSettings } from './settings/LayerSettings'

type AssignmentModePathShortcuts =
	| AnimationSettings['AssignmentModePathShortcuts']
	| ColorSettings['AssignmentModePathShortcuts']
	| GridSettings['AssignmentModePathShortcuts']
	| LayerSettings['AssignmentModePathShortcuts']

type BooleanPathShortcuts =
	| AnimationSettings['BooleanPathShortcuts']
	| ColorSettings['BooleanPathShortcuts']
	| GridSettings['BooleanPathShortcuts']
	| LayerSettings['BooleanPathShortcuts']
	| 'centerViewOnCenterOfTileAtHomeAddress'
	| 'collapseSameColoredShapesWithinTile'
	| 'zoomOnCanvasCenter'

type ColorPathShortcuts =
	| AnimationSettings['ColorPathShortcuts']
	| ColorSettings['ColorPathShortcuts']
	| GridSettings['ColorPathShortcuts']
	| LayerSettings['ColorPathShortcuts']

type ColorsPathShortcuts =
	| AnimationSettings['ColorsPathShortcuts']
	| ColorSettings['ColorsPathShortcuts']
	| GridSettings['ColorsPathShortcuts']
	| LayerSettings['ColorsPathShortcuts']

type ColorSetPathShortcuts =
	| AnimationSettings['ColorSetPathShortcuts']
	| ColorSettings['ColorSetPathShortcuts']
	| GridSettings['ColorSetPathShortcuts']
	| LayerSettings['ColorSetPathShortcuts']

type ExecuteTexturePathShortcuts =
	| AnimationSettings['ExecuteTexturePathShortcuts']
	| ColorSettings['ExecuteTexturePathShortcuts']
	| GridSettings['ExecuteTexturePathShortcuts']
	| LayerSettings['ExecuteTexturePathShortcuts']
	| 'executeTexture'

type FramePathShortcuts =
	| AnimationSettings['FramePathShortcuts']
	| ColorSettings['FramePathShortcuts']
	| GridSettings['FramePathShortcuts']
	| LayerSettings['FramePathShortcuts']

type GetStripePositionsPathShortcuts =
	| AnimationSettings['GetStripePositionsPathShortcuts']
	| ColorSettings['GetStripePositionsPathShortcuts']
	| GridSettings['GetStripePositionsPathShortcuts']
	| LayerSettings['GetStripePositionsPathShortcuts']

type GetTileOriginAndSizePathShortcuts =
	| AnimationSettings['GetTileOriginAndSizePathShortcuts']
	| ColorSettings['GetTileOriginAndSizePathShortcuts']
	| GridSettings['GetTileOriginAndSizePathShortcuts']
	| LayerSettings['GetTileOriginAndSizePathShortcuts']
	| 'getTileOriginAndSize'

type LayerPathShortcuts =
	| AnimationSettings['LayerPathShortcuts']
	| ColorSettings['LayerPathShortcuts']
	| GridSettings['LayerPathShortcuts']
	| LayerSettings['LayerPathShortcuts']
	| 'endLayer'

type NumberPathShortcuts =
	| AnimationSettings['NumberPathShortcuts']
	| ColorSettings['NumberPathShortcuts']
	| GridSettings['NumberPathShortcuts']
	| LayerSettings['NumberPathShortcuts']
	| 'stripeCount'
	| 'opacity'
	| 'zoom'

type OffsetAddressPathShortcuts =
	| AnimationSettings['OffsetAddressPathShortcuts']
	| ColorSettings['OffsetAddressPathShortcuts']
	| GridSettings['OffsetAddressPathShortcuts']
	| LayerSettings['OffsetAddressPathShortcuts']

type PxPathShortcuts =
	| AnimationSettings['PxPathShortcuts']
	| ColorSettings['PxPathShortcuts']
	| GridSettings['PxPathShortcuts']
	| LayerSettings['PxPathShortcuts']
	| 'canvasSize'

type RadianPathShortcuts =
	| AnimationSettings['RadianPathShortcuts']
	| ColorSettings['RadianPathShortcuts']
	| GridSettings['RadianPathShortcuts']
	| LayerSettings['RadianPathShortcuts']
	| 'rotateViewAboutCanvasCenter'

type StripeCountModePathShortcuts =
	| AnimationSettings['StripeCountModePathShortcuts']
	| ColorSettings['StripeCountModePathShortcuts']
	| GridSettings['StripeCountModePathShortcuts']
	| LayerSettings['StripeCountModePathShortcuts']

type SupertilePathShortcuts =
	| AnimationSettings['SupertilePathShortcuts']
	| ColorSettings['SupertilePathShortcuts']
	| GridSettings['SupertilePathShortcuts']
	| LayerSettings['SupertilePathShortcuts']

type TransformShapeColorIndicesPathShortcuts =
	| AnimationSettings['TransformShapeColorIndicesPathShortcuts']
	| ColorSettings['TransformShapeColorIndicesPathShortcuts']
	| GridSettings['TransformShapeColorIndicesPathShortcuts']
	| LayerSettings['TransformShapeColorIndicesPathShortcuts']

type UnitPathShortcuts =
	| AnimationSettings['UnitPathShortcuts']
	| ColorSettings['UnitPathShortcuts']
	| GridSettings['UnitPathShortcuts']
	| LayerSettings['UnitPathShortcuts']
	| 'tileSize'

type WeavePathShortcuts =
	| AnimationSettings['WeavePathShortcuts']
	| ColorSettings['WeavePathShortcuts']
	| GridSettings['WeavePathShortcuts']
	| LayerSettings['WeavePathShortcuts']

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
