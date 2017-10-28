// tslint:disable:ordered-imports max-file-line-count

// Settings type imports

import {
	AnimationSettings,
	ColorAssignmentSettings,
	ColorSettings,
	GridSettings,
	LayerSettings,
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
	ColorSet,
	ExecuteTexture,
	GetTileOriginAndSize,
	OffsetAddress,
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
} from './SettingsPathShortcuts'

interface GetFromBaseOrDefaultPattern {
	// Settings type path shortcuts

	(settingsPathShortcut: AnimationSettingsPathShortcut): AnimationSettings

	(settingsPathShortcut: ColorSettingsPathShortcut): ColorSettings

	(settingsPathShortcut: ColorAssignmentSettingsPathShortcut): ColorAssignmentSettings

	(settingsPathShortcut: GridSettingsPathShortcut): GridSettings

	(settingsPathShortcut: LayerSettingsPathShortcut): LayerSettings

	(settingsPathShortcut: StripeCountContinuumSettingsPathShortcut): StripeCountContinuumSettings

	(settingsPathShortcut: StripePositionSettingsPathShortcut): StripePositionSettings

	(settingsPathShortcut: TextureSettingsPathShortcut): TextureSettings

	(settingsPathShortcut: TileSettingsPathShortcut): TileSettings

	(settingsPathShortcut: ViewSettingsPathShortcut): ViewSettings

	// General type path shortcuts

	(settingsPathShortcut: AssignmentModePathShortcuts): AssignmentMode

	(settingsPathShortcut: BooleanPathShortcuts): boolean

	(settingsPathShortcut: ColorPathShortcuts): Color

	(settingsPathShortcut: ColorsPathShortcuts): Color[]

	(settingsPathShortcut: ColorSetPathShortcuts): ColorSet

	(settingsPathShortcut: ExecuteTexturePathShortcuts): ExecuteTexture

	(settingsPathShortcut: FramePathShortcuts): Frame

	(settingsPathShortcut: GetTileOriginAndSizePathShortcuts): GetTileOriginAndSize

	(settingsPathShortcut: LayerPathShortcuts): Layer

	(settingsPathShortcut: NumberPathShortcuts): number

	(settingsPathShortcut: OffsetAddressPathShortcuts): OffsetAddress

	(settingsPathShortcut: PxPathShortcuts): Px

	(settingsPathShortcut: RadianPathShortcuts): Radian

	(settingsPathShortcut: SupertilePathShortcuts): Supertile

	(settingsPathShortcut: TransformShapeColorIndicesPathShortcuts): TransformShapeColorIndices

	(settingsPathShortcut: UnitPathShortcuts): Unit

	(settingsPathShortcut: WeavePathShortcuts): Weave

	// Catch missing

	(settingsPathShortcut: {}): MissingSettingsPathShortcut
}

export { GetFromBaseOrDefaultPattern }
