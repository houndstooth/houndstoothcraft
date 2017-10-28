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
import { TextureSettingsPathShortcut, TextureSettingsTypePathShortcuts as TextureSettings } from './settings/TextureSettings'
import { TileSettingsPathShortcut, TileSettingsTypePathShortcuts as TileSettings } from './settings/TileSettings'

type AssignmentModePathShortcuts =
	| AnimationSettings['AssignmentModePathShortcuts']
	| ColorSettings['AssignmentModePathShortcuts']
	| GridSettings['AssignmentModePathShortcuts']
	| LayerSettings['AssignmentModePathShortcuts']
	| StripeSettings['AssignmentModePathShortcuts']
	| TextureSettings['AssignmentModePathShortcuts']
	| TileSettings['AssignmentModePathShortcuts']

type BaseStripeDiagonalPathShortcuts =
	| AnimationSettings['BaseStripeDiagonalPathShortcuts']
	| ColorSettings['BaseStripeDiagonalPathShortcuts']
	| GridSettings['BaseStripeDiagonalPathShortcuts']
	| LayerSettings['BaseStripeDiagonalPathShortcuts']
	| StripeSettings['BaseStripeDiagonalPathShortcuts']
	| TextureSettings['BaseStripeDiagonalPathShortcuts']
	| TileSettings['BaseStripeDiagonalPathShortcuts']

type BooleanPathShortcuts =
	| AnimationSettings['BooleanPathShortcuts']
	| ColorSettings['BooleanPathShortcuts']
	| GridSettings['BooleanPathShortcuts']
	| LayerSettings['BooleanPathShortcuts']
	| StripeSettings['BooleanPathShortcuts']
	| TextureSettings['BooleanPathShortcuts']
	| TileSettings['BooleanPathShortcuts']
	| 'centerViewOnCenterOfTileAtHomeAddress'
	| 'zoomOnCanvasCenter'

type ColorPathShortcuts =
	| AnimationSettings['ColorPathShortcuts']
	| ColorSettings['ColorPathShortcuts']
	| GridSettings['ColorPathShortcuts']
	| LayerSettings['ColorPathShortcuts']
	| StripeSettings['ColorPathShortcuts']
	| TextureSettings['ColorPathShortcuts']
	| TileSettings['ColorPathShortcuts']

type ColorsPathShortcuts =
	| AnimationSettings['ColorsPathShortcuts']
	| ColorSettings['ColorsPathShortcuts']
	| GridSettings['ColorsPathShortcuts']
	| LayerSettings['ColorsPathShortcuts']
	| StripeSettings['ColorsPathShortcuts']
	| TextureSettings['ColorsPathShortcuts']
	| TileSettings['ColorsPathShortcuts']

type ColorSetPathShortcuts =
	| AnimationSettings['ColorSetPathShortcuts']
	| ColorSettings['ColorSetPathShortcuts']
	| GridSettings['ColorSetPathShortcuts']
	| LayerSettings['ColorSetPathShortcuts']
	| StripeSettings['ColorSetPathShortcuts']
	| TextureSettings['ColorSetPathShortcuts']
	| TileSettings['ColorSetPathShortcuts']

type ExecuteTexturePathShortcuts =
	| AnimationSettings['ExecuteTexturePathShortcuts']
	| ColorSettings['ExecuteTexturePathShortcuts']
	| GridSettings['ExecuteTexturePathShortcuts']
	| LayerSettings['ExecuteTexturePathShortcuts']
	| StripeSettings['ExecuteTexturePathShortcuts']
	| TextureSettings['ExecuteTexturePathShortcuts']
	| TileSettings['ExecuteTexturePathShortcuts']

type FramePathShortcuts =
	| AnimationSettings['FramePathShortcuts']
	| ColorSettings['FramePathShortcuts']
	| GridSettings['FramePathShortcuts']
	| LayerSettings['FramePathShortcuts']
	| StripeSettings['FramePathShortcuts']
	| TextureSettings['FramePathShortcuts']
	| TileSettings['FramePathShortcuts']

type GetStripePositionsPathShortcuts =
	| AnimationSettings['GetStripePositionsPathShortcuts']
	| ColorSettings['GetStripePositionsPathShortcuts']
	| GridSettings['GetStripePositionsPathShortcuts']
	| LayerSettings['GetStripePositionsPathShortcuts']
	| StripeSettings['GetStripePositionsPathShortcuts']
	| TileSettings['GetStripePositionsPathShortcuts']

type GetTileOriginAndSizePathShortcuts =
	| AnimationSettings['GetTileOriginAndSizePathShortcuts']
	| ColorSettings['GetTileOriginAndSizePathShortcuts']
	| GridSettings['GetTileOriginAndSizePathShortcuts']
	| LayerSettings['GetTileOriginAndSizePathShortcuts']
	| StripeSettings['GetTileOriginAndSizePathShortcuts']
	| TextureSettings['GetTileOriginAndSizePathShortcuts']
	| TileSettings['GetTileOriginAndSizePathShortcuts']

type LayerPathShortcuts =
	| AnimationSettings['LayerPathShortcuts']
	| ColorSettings['LayerPathShortcuts']
	| GridSettings['LayerPathShortcuts']
	| LayerSettings['LayerPathShortcuts']
	| StripeSettings['LayerPathShortcuts']
	| TextureSettings['LayerPathShortcuts']
	| TileSettings['LayerPathShortcuts']

type NumberPathShortcuts =
	| AnimationSettings['NumberPathShortcuts']
	| ColorSettings['NumberPathShortcuts']
	| GridSettings['NumberPathShortcuts']
	| LayerSettings['NumberPathShortcuts']
	| StripeSettings['NumberPathShortcuts']
	| TextureSettings['NumberPathShortcuts']
	| TileSettings['NumberPathShortcuts']
	| 'zoom'

type OffsetAddressPathShortcuts =
	| AnimationSettings['OffsetAddressPathShortcuts']
	| ColorSettings['OffsetAddressPathShortcuts']
	| GridSettings['OffsetAddressPathShortcuts']
	| LayerSettings['OffsetAddressPathShortcuts']
	| StripeSettings['OffsetAddressPathShortcuts']
	| TextureSettings['OffsetAddressPathShortcuts']
	| TileSettings['OffsetAddressPathShortcuts']

type PxPathShortcuts =
	| AnimationSettings['PxPathShortcuts']
	| ColorSettings['PxPathShortcuts']
	| GridSettings['PxPathShortcuts']
	| LayerSettings['PxPathShortcuts']
	| StripeSettings['PxPathShortcuts']
	| TextureSettings['PxPathShortcuts']
	| TileSettings['PxPathShortcuts']
	| 'canvasSize'

type RadianPathShortcuts =
	| AnimationSettings['RadianPathShortcuts']
	| ColorSettings['RadianPathShortcuts']
	| GridSettings['RadianPathShortcuts']
	| LayerSettings['RadianPathShortcuts']
	| StripeSettings['RadianPathShortcuts']
	| TextureSettings['RadianPathShortcuts']
	| TileSettings['RadianPathShortcuts']
	| 'rotateViewAboutCanvasCenter'

type StripeCountModePathShortcuts =
	| AnimationSettings['StripeCountModePathShortcuts']
	| ColorSettings['StripeCountModePathShortcuts']
	| GridSettings['StripeCountModePathShortcuts']
	| LayerSettings['StripeCountModePathShortcuts']
	| StripeSettings['StripeCountModePathShortcuts']
	| TextureSettings['StripeCountModePathShortcuts']
	| TileSettings['StripeCountModePathShortcuts']

type SupertilePathShortcuts =
	| AnimationSettings['SupertilePathShortcuts']
	| ColorSettings['SupertilePathShortcuts']
	| GridSettings['SupertilePathShortcuts']
	| LayerSettings['SupertilePathShortcuts']
	| StripeSettings['SupertilePathShortcuts']
	| TextureSettings['SupertilePathShortcuts']
	| TileSettings['SupertilePathShortcuts']

type TransformShapeColorIndicesPathShortcuts =
	| AnimationSettings['TransformShapeColorIndicesPathShortcuts']
	| ColorSettings['TransformShapeColorIndicesPathShortcuts']
	| GridSettings['TransformShapeColorIndicesPathShortcuts']
	| LayerSettings['TransformShapeColorIndicesPathShortcuts']
	| StripeSettings['TransformShapeColorIndicesPathShortcuts']
	| TextureSettings['TransformShapeColorIndicesPathShortcuts']
	| TileSettings['TransformShapeColorIndicesPathShortcuts']

type UnitPathShortcuts =
	| AnimationSettings['UnitPathShortcuts']
	| ColorSettings['UnitPathShortcuts']
	| GridSettings['UnitPathShortcuts']
	| LayerSettings['UnitPathShortcuts']
	| StripeSettings['UnitPathShortcuts']
	| TextureSettings['UnitPathShortcuts']
	| TileSettings['UnitPathShortcuts']

type WeavePathShortcuts =
	| AnimationSettings['WeavePathShortcuts']
	| ColorSettings['WeavePathShortcuts']
	| GridSettings['WeavePathShortcuts']
	| LayerSettings['WeavePathShortcuts']
	| StripeSettings['WeavePathShortcuts']
	| TextureSettings['WeavePathShortcuts']
	| TileSettings['WeavePathShortcuts']

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
