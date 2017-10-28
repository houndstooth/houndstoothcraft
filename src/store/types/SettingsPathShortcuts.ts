// tslint:disable:max-file-line-count max-line-length

import { AnimationSettingsPathShortcut, AnimationSettingsTypePathShortcuts as AnimationSettings } from './settings/AnimationSettings'
import { ColorAssignmentSettingsPathShortcut, ColorSettingsPathShortcut, ColorSettingsTypePathShortcuts as ColorSettings } from './settings/ColorSettings'
import { GridSettingsPathShortcut, GridSettingsTypePathShortcuts as GridSettings } from './settings/GridSettings'
import { LayerSettingsPathShortcut, LayerSettingsTypePathShortcuts as LayerSettings } from './settings/LayerSettings'
import {
	StripeCountContinuumSettingsPathShortcut,
	StripePositionSettingsPathShortcut,
	StripeSettingsPathShortcut,
	StripeSettingsTypePathShortcuts as StripeSettings,
} from './settings/StripeSettings'

type AssignmentModePathShortcuts =
	| AnimationSettings['AssignmentModePathShortcuts']
	| ColorSettings['AssignmentModePathShortcuts']
	| GridSettings['AssignmentModePathShortcuts']
	| LayerSettings['AssignmentModePathShortcuts']
	| StripeSettings['AssignmentModePathShortcuts']

type BaseStripeDiagonalPathShortcuts =
	| AnimationSettings['BaseStripeDiagonalPathShortcuts']
	| ColorSettings['BaseStripeDiagonalPathShortcuts']
	| GridSettings['BaseStripeDiagonalPathShortcuts']
	| LayerSettings['BaseStripeDiagonalPathShortcuts']
	| StripeSettings['BaseStripeDiagonalPathShortcuts']

type BooleanPathShortcuts =
	| AnimationSettings['BooleanPathShortcuts']
	| ColorSettings['BooleanPathShortcuts']
	| GridSettings['BooleanPathShortcuts']
	| LayerSettings['BooleanPathShortcuts']
	| StripeSettings['BooleanPathShortcuts']
	| 'centerViewOnCenterOfTileAtHomeAddress'
	| 'collapseSameColoredShapesWithinTile'
	| 'zoomOnCanvasCenter'

type ColorPathShortcuts =
	| AnimationSettings['ColorPathShortcuts']
	| ColorSettings['ColorPathShortcuts']
	| GridSettings['ColorPathShortcuts']
	| LayerSettings['ColorPathShortcuts']
	| StripeSettings['ColorPathShortcuts']

type ColorsPathShortcuts =
	| AnimationSettings['ColorsPathShortcuts']
	| ColorSettings['ColorsPathShortcuts']
	| GridSettings['ColorsPathShortcuts']
	| LayerSettings['ColorsPathShortcuts']
	| StripeSettings['ColorsPathShortcuts']

type ColorSetPathShortcuts =
	| AnimationSettings['ColorSetPathShortcuts']
	| ColorSettings['ColorSetPathShortcuts']
	| GridSettings['ColorSetPathShortcuts']
	| LayerSettings['ColorSetPathShortcuts']
	| StripeSettings['ColorSetPathShortcuts']

type ExecuteTexturePathShortcuts =
	| AnimationSettings['ExecuteTexturePathShortcuts']
	| ColorSettings['ExecuteTexturePathShortcuts']
	| GridSettings['ExecuteTexturePathShortcuts']
	| LayerSettings['ExecuteTexturePathShortcuts']
	| StripeSettings['ExecuteTexturePathShortcuts']
	| 'executeTexture'

type FramePathShortcuts =
	| AnimationSettings['FramePathShortcuts']
	| ColorSettings['FramePathShortcuts']
	| GridSettings['FramePathShortcuts']
	| LayerSettings['FramePathShortcuts']
	| StripeSettings['FramePathShortcuts']

type GetStripePositionsPathShortcuts =
	| AnimationSettings['GetStripePositionsPathShortcuts']
	| ColorSettings['GetStripePositionsPathShortcuts']
	| GridSettings['GetStripePositionsPathShortcuts']
	| LayerSettings['GetStripePositionsPathShortcuts']
	| StripeSettings['GetStripePositionsPathShortcuts']

type GetTileOriginAndSizePathShortcuts =
	| AnimationSettings['GetTileOriginAndSizePathShortcuts']
	| ColorSettings['GetTileOriginAndSizePathShortcuts']
	| GridSettings['GetTileOriginAndSizePathShortcuts']
	| LayerSettings['GetTileOriginAndSizePathShortcuts']
	| StripeSettings['GetTileOriginAndSizePathShortcuts']
	| 'getTileOriginAndSize'

type LayerPathShortcuts =
	| AnimationSettings['LayerPathShortcuts']
	| ColorSettings['LayerPathShortcuts']
	| GridSettings['LayerPathShortcuts']
	| LayerSettings['LayerPathShortcuts']
	| StripeSettings['LayerPathShortcuts']

type NumberPathShortcuts =
	| AnimationSettings['NumberPathShortcuts']
	| ColorSettings['NumberPathShortcuts']
	| GridSettings['NumberPathShortcuts']
	| LayerSettings['NumberPathShortcuts']
	| StripeSettings['NumberPathShortcuts']
	| 'zoom'

type OffsetAddressPathShortcuts =
	| AnimationSettings['OffsetAddressPathShortcuts']
	| ColorSettings['OffsetAddressPathShortcuts']
	| GridSettings['OffsetAddressPathShortcuts']
	| LayerSettings['OffsetAddressPathShortcuts']
	| StripeSettings['OffsetAddressPathShortcuts']

type PxPathShortcuts =
	| AnimationSettings['PxPathShortcuts']
	| ColorSettings['PxPathShortcuts']
	| GridSettings['PxPathShortcuts']
	| LayerSettings['PxPathShortcuts']
	| StripeSettings['PxPathShortcuts']
	| 'canvasSize'

type RadianPathShortcuts =
	| AnimationSettings['RadianPathShortcuts']
	| ColorSettings['RadianPathShortcuts']
	| GridSettings['RadianPathShortcuts']
	| LayerSettings['RadianPathShortcuts']
	| StripeSettings['RadianPathShortcuts']
	| 'rotateViewAboutCanvasCenter'

type StripeCountModePathShortcuts =
	| AnimationSettings['StripeCountModePathShortcuts']
	| ColorSettings['StripeCountModePathShortcuts']
	| GridSettings['StripeCountModePathShortcuts']
	| LayerSettings['StripeCountModePathShortcuts']
	| StripeSettings['StripeCountModePathShortcuts']

type SupertilePathShortcuts =
	| AnimationSettings['SupertilePathShortcuts']
	| ColorSettings['SupertilePathShortcuts']
	| GridSettings['SupertilePathShortcuts']
	| LayerSettings['SupertilePathShortcuts']
	| StripeSettings['SupertilePathShortcuts']

type TransformShapeColorIndicesPathShortcuts =
	| AnimationSettings['TransformShapeColorIndicesPathShortcuts']
	| ColorSettings['TransformShapeColorIndicesPathShortcuts']
	| GridSettings['TransformShapeColorIndicesPathShortcuts']
	| LayerSettings['TransformShapeColorIndicesPathShortcuts']
	| StripeSettings['TransformShapeColorIndicesPathShortcuts']

type UnitPathShortcuts =
	| AnimationSettings['UnitPathShortcuts']
	| ColorSettings['UnitPathShortcuts']
	| GridSettings['UnitPathShortcuts']
	| LayerSettings['UnitPathShortcuts']
	| StripeSettings['UnitPathShortcuts']
	| 'tileSize'

type WeavePathShortcuts =
	| AnimationSettings['WeavePathShortcuts']
	| ColorSettings['WeavePathShortcuts']
	| GridSettings['WeavePathShortcuts']
	| LayerSettings['WeavePathShortcuts']
	| StripeSettings['WeavePathShortcuts']

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
	StripeSettingsPathShortcut,
	StripeCountContinuumSettingsPathShortcut,
	StripePositionSettingsPathShortcut,
	TextureSettingsPathShortcut,
	TileSettingsPathShortcut,
	ViewSettingsPathShortcut,

	// General type path shortcuts

	AssignmentModePathShortcuts,
	BaseStripeDiagonalPathShortcuts,
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
