// tslint:disable:ordered-imports max-file-line-count

// Settings type imports

import {
	AnimationSettings,
	ColorAssignmentSettings,
	ColorSettings,
	GridSettings,
	LayerSettings,
	StripeSettings,
	StripeCountContinuumSettings,
	StripePositionSettings,
	TextureSettings,
	TileSettings,
	ViewSettings,
} from './settings'

// General type imports

import { Frame } from '../../animation'
import {
	AssignmentMode,
	BaseStripeDiagonal,
	ColorSet,
	ExecuteTexture,
	GetStripePositions,
	GetTileOriginAndSize,
	OffsetAddress,
	StripeCountMode,
	Supertile,
	TransformShapeColorIndices,
	Unit,
	Weave,
} from '../../components'
import { Layer } from '../../execute'
import { Px } from '../../page'
import { Color } from '../../render'
import { Radian } from '../../space'

import { MissingSettingsPathShortcut } from './MissingSettingsPathShortcut'
import {
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

	TypePathShortcuts,
} from './SettingsPathShortcuts'

interface GetFromBaseOrDefaultPattern {
	// Settings type path shortcuts

	(settingsPathShortcut: AnimationSettingsPathShortcut): AnimationSettings

	(settingsPathShortcut: ColorSettingsPathShortcut): ColorSettings

	(settingsPathShortcut: ColorAssignmentSettingsPathShortcut): ColorAssignmentSettings

	(settingsPathShortcut: GridSettingsPathShortcut): GridSettings

	(settingsPathShortcut: LayerSettingsPathShortcut): LayerSettings

	(settingsPathShortcut: StripeSettingsPathShortcut): StripeSettings

	(settingsPathShortcut: StripeCountContinuumSettingsPathShortcut): StripeCountContinuumSettings

	(settingsPathShortcut: StripePositionSettingsPathShortcut): StripePositionSettings

	(settingsPathShortcut: TextureSettingsPathShortcut): TextureSettings

	(settingsPathShortcut: TileSettingsPathShortcut): TileSettings

	(settingsPathShortcut: ViewSettingsPathShortcut): ViewSettings

	// General type path shortcuts

	(settingsPathShortcut: TypePathShortcuts['AssignmentModePathShortcuts']): AssignmentMode

	(settingsPathShortcut: TypePathShortcuts['BaseStripeDiagonalPathShortcuts']): BaseStripeDiagonal

	(settingsPathShortcut: TypePathShortcuts['BooleanPathShortcuts']): boolean

	(settingsPathShortcut: TypePathShortcuts['ColorPathShortcuts']): Color

	(settingsPathShortcut: TypePathShortcuts['ColorsPathShortcuts']): Color[]

	(settingsPathShortcut: TypePathShortcuts['ColorSetPathShortcuts']): ColorSet

	(settingsPathShortcut: TypePathShortcuts['ExecuteTexturePathShortcuts']): ExecuteTexture

	(settingsPathShortcut: TypePathShortcuts['FramePathShortcuts']): Frame

	(settingsPathShortcut: TypePathShortcuts['GetStripePositionsPathShortcuts']): GetStripePositions

	(settingsPathShortcut: TypePathShortcuts['GetTileOriginAndSizePathShortcuts']): GetTileOriginAndSize

	(settingsPathShortcut: TypePathShortcuts['LayerPathShortcuts']): Layer

	(settingsPathShortcut: TypePathShortcuts['NumberPathShortcuts']): number

	(settingsPathShortcut: TypePathShortcuts['OffsetAddressPathShortcuts']): OffsetAddress

	(settingsPathShortcut: TypePathShortcuts['PxPathShortcuts']): Px

	(settingsPathShortcut: TypePathShortcuts['RadianPathShortcuts']): Radian

	(settingsPathShortcut: TypePathShortcuts['StripeCountModePathShortcuts']): StripeCountMode

	(settingsPathShortcut: TypePathShortcuts['SupertilePathShortcuts']): Supertile

	(settingsPathShortcut: TypePathShortcuts['TransformShapeColorIndicesPathShortcuts']): TransformShapeColorIndices

	(settingsPathShortcut: TypePathShortcuts['UnitPathShortcuts']): Unit

	(settingsPathShortcut: TypePathShortcuts['WeavePathShortcuts']): Weave

	// Catch missing

	(settingsPathShortcut: {}): MissingSettingsPathShortcut
}

export { GetFromBaseOrDefaultPattern }
