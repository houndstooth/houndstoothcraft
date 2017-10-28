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

interface SetSetting {
	// Settings type path shortcuts

	(settingsPathShortcut: AnimationSettingsPathShortcut, value: AnimationSettings): void

	(settingsPathShortcut: ColorSettingsPathShortcut, value: ColorSettings): void

	(settingsPathShortcut: ColorAssignmentSettingsPathShortcut, value: ColorAssignmentSettings): void

	(settingsPathShortcut: GridSettingsPathShortcut, value: GridSettings): void

	(settingsPathShortcut: LayerSettingsPathShortcut, value: LayerSettings): void

	(settingsPathShortcut: StripeCountContinuumSettingsPathShortcut, value: StripeCountContinuumSettings): void

	(settingsPathShortcut: StripePositionSettingsPathShortcut, value: StripePositionSettings): void

	(settingsPathShortcut: TextureSettingsPathShortcut, value: TextureSettings): void

	(settingsPathShortcut: TileSettingsPathShortcut, value: TileSettings): void

	(settingsPathShortcut: ViewSettingsPathShortcut, value: ViewSettings): void

	(settingsPathShortcut: ViewSettingsPathShortcut, value: ViewSettings): void

	// General type path shortcuts

	(settingsPathShortcut: AssignmentModePathShortcuts, value: AssignmentMode): void

	(settingsPathShortcut: BooleanPathShortcuts, value: boolean): void

	(settingsPathShortcut: ColorPathShortcuts, value: Color): void

	(settingsPathShortcut: ColorSetPathShortcuts, value: ColorSet): void

	(settingsPathShortcut: ColorsPathShortcuts, value: Color[]): void

	(settingsPathShortcut: ExecuteTexturePathShortcuts, value: ExecuteTexture): void

	(settingsPathShortcut: FramePathShortcuts, value: Frame): void

	(settingsPathShortcut: GetTileOriginAndSizePathShortcuts, value: GetTileOriginAndSize): void

	(settingsPathShortcut: LayerPathShortcuts, value: Layer): void

	(settingsPathShortcut: NumberPathShortcuts, value: number): void

	(settingsPathShortcut: OffsetAddressPathShortcuts, value: OffsetAddress): void

	(settingsPathShortcut: PxPathShortcuts, value: Px): void

	(settingsPathShortcut: RadianPathShortcuts, value: Radian): void

	(settingsPathShortcut: SupertilePathShortcuts, value: Supertile): void

	(settingsPathShortcut: TransformShapeColorIndicesPathShortcuts, value: TransformShapeColorIndices): void

	(settingsPathShortcut: UnitPathShortcuts, value: Unit): void

	(settingsPathShortcut: WeavePathShortcuts, value: Weave): void

	// Catch missing

	(settingsPathShortcut: {}): MissingSettingsPathShortcut
}

export { SetSetting }
