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

interface SetSetting {
	// Settings type path shortcuts

	(settingsPathShortcut: AnimationSettingsPathShortcut, value: AnimationSettings): void

	(settingsPathShortcut: ColorSettingsPathShortcut, value: ColorSettings): void

	(settingsPathShortcut: ColorAssignmentSettingsPathShortcut, value: ColorAssignmentSettings): void

	(settingsPathShortcut: GridSettingsPathShortcut, value: GridSettings): void

	(settingsPathShortcut: LayerSettingsPathShortcut, value: LayerSettings): void

	(settingsPathShortcut: StripeSettingsPathShortcut, value: StripeSettings): void

	(settingsPathShortcut: StripeCountContinuumSettingsPathShortcut, value: StripeCountContinuumSettings): void

	(settingsPathShortcut: StripePositionSettingsPathShortcut, value: StripePositionSettings): void

	(settingsPathShortcut: TextureSettingsPathShortcut, value: TextureSettings): void

	(settingsPathShortcut: TileSettingsPathShortcut, value: TileSettings): void

	(settingsPathShortcut: ViewSettingsPathShortcut, value: ViewSettings): void

	(settingsPathShortcut: ViewSettingsPathShortcut, value: ViewSettings): void

	// General type path shortcuts

	(settingsPathShortcut: TypePathShortcuts['AssignmentModePathShortcuts'], value: AssignmentMode): void

	(settingsPathShortcut: TypePathShortcuts['BaseStripeDiagonalPathShortcuts'], value: BaseStripeDiagonal): void

	(settingsPathShortcut: TypePathShortcuts['BooleanPathShortcuts'], value: boolean): void

	(settingsPathShortcut: TypePathShortcuts['ColorPathShortcuts'], value: Color): void

	(settingsPathShortcut: TypePathShortcuts['ColorSetPathShortcuts'], value: ColorSet): void

	(settingsPathShortcut: TypePathShortcuts['ColorsPathShortcuts'], value: Color[]): void

	(settingsPathShortcut: TypePathShortcuts['ExecuteTexturePathShortcuts'], value: ExecuteTexture): void

	(settingsPathShortcut: TypePathShortcuts['FramePathShortcuts'], value: Frame): void

	(settingsPathShortcut: TypePathShortcuts['GetStripePositionsPathShortcuts'], value: GetStripePositions): void

	(settingsPathShortcut: TypePathShortcuts['GetTileOriginAndSizePathShortcuts'], value: GetTileOriginAndSize): void

	(settingsPathShortcut: TypePathShortcuts['LayerPathShortcuts'], value: Layer): void

	(settingsPathShortcut: TypePathShortcuts['NumberPathShortcuts'], value: number): void

	(settingsPathShortcut: TypePathShortcuts['OffsetAddressPathShortcuts'], value: OffsetAddress): void

	(settingsPathShortcut: TypePathShortcuts['PxPathShortcuts'], value: Px): void

	(settingsPathShortcut: TypePathShortcuts['RadianPathShortcuts'], value: Radian): void

	(settingsPathShortcut: TypePathShortcuts['StripeCountModePathShortcuts'], value: StripeCountMode): void

	(settingsPathShortcut: TypePathShortcuts['SupertilePathShortcuts'], value: Supertile): void

	(settingsPathShortcut: TypePathShortcuts['TransformShapeColorIndicesPathShortcuts'], value: TransformShapeColorIndices): void

	(settingsPathShortcut: TypePathShortcuts['UnitPathShortcuts'], value: Unit): void

	(settingsPathShortcut: TypePathShortcuts['WeavePathShortcuts'], value: Weave): void
}

export { SetSetting }
