// tslint:disable:max-line-length

import * as Settings from './settings'
import { Frame } from '../../animation'
import * as Components from '../../components'
import { Layer } from '../../execute'
import { Px } from '../../page'
import { Color } from '../../render'
import { Radian } from '../../space'
import { TypePathShortcuts } from './TypePathShortcuts'
import * as SettingsPathShortcuts from './SettingsPathShortcuts';

interface SetSetting {
	(settingsPathShortcut: SettingsPathShortcuts.AnimationSettingsPathShortcut, value: Settings.AnimationSettings): void
	(settingsPathShortcut: SettingsPathShortcuts.ColorSettingsPathShortcut, value: Settings.ColorSettings): void
	(settingsPathShortcut: SettingsPathShortcuts.ColorAssignmentSettingsPathShortcut, value: Settings.ColorAssignmentSettings): void
	(settingsPathShortcut: SettingsPathShortcuts.GridSettingsPathShortcut, value: Settings.GridSettings): void
	(settingsPathShortcut: SettingsPathShortcuts.LayerSettingsPathShortcut, value: Settings.LayerSettings): void
	(settingsPathShortcut: SettingsPathShortcuts.StripeSettingsPathShortcut, value: Settings.StripeSettings): void
	(settingsPathShortcut: SettingsPathShortcuts.StripeCountContinuumSettingsPathShortcut, value: Settings.StripeCountContinuumSettings): void
	(settingsPathShortcut: SettingsPathShortcuts.StripePositionSettingsPathShortcut, value: Settings.StripePositionSettings): void
	(settingsPathShortcut: SettingsPathShortcuts.TextureSettingsPathShortcut, value: Settings.TextureSettings): void
	(settingsPathShortcut: SettingsPathShortcuts.TileSettingsPathShortcut, value: Settings.TileSettings): void
	(settingsPathShortcut: SettingsPathShortcuts.ViewSettingsPathShortcut, value: Settings.ViewSettings): void
	(settingsPathShortcut: TypePathShortcuts['AssignmentModePathShortcuts'], value: Components.AssignmentMode): void
	(settingsPathShortcut: TypePathShortcuts['BaseStripeDiagonalPathShortcuts'], value: Components.BaseStripeDiagonal): void
	(settingsPathShortcut: TypePathShortcuts['BooleanPathShortcuts'], value: boolean): void
	(settingsPathShortcut: TypePathShortcuts['ColorPathShortcuts'], value: Color): void
	(settingsPathShortcut: TypePathShortcuts['ColorSetPathShortcuts'], value: Components.ColorSet): void
	(settingsPathShortcut: TypePathShortcuts['ColorsPathShortcuts'], value: Color[]): void
	(settingsPathShortcut: TypePathShortcuts['ExecuteTexturePathShortcuts'], value: Components.ExecuteTexture): void
	(settingsPathShortcut: TypePathShortcuts['FramePathShortcuts'], value: Frame): void
	(settingsPathShortcut: TypePathShortcuts['GetStripePositionsPathShortcuts'], value: Components.GetStripePositions): void
	(settingsPathShortcut: TypePathShortcuts['GetTileOriginAndSizePathShortcuts'], value: Components.GetTileOriginAndSize): void
	(settingsPathShortcut: TypePathShortcuts['LayerPathShortcuts'], value: Layer): void
	(settingsPathShortcut: TypePathShortcuts['NumberPathShortcuts'], value: number): void
	(settingsPathShortcut: TypePathShortcuts['OffsetAddressPathShortcuts'], value: Components.OffsetAddress): void
	(settingsPathShortcut: TypePathShortcuts['PxPathShortcuts'], value: Px): void
	(settingsPathShortcut: TypePathShortcuts['RadianPathShortcuts'], value: Radian): void
	(settingsPathShortcut: TypePathShortcuts['StripeCountModePathShortcuts'], value: Components.StripeCountMode): void
	(settingsPathShortcut: TypePathShortcuts['SupertilePathShortcuts'], value: Components.Supertile): void
	(settingsPathShortcut: TypePathShortcuts['TransformShapeColorIndicesPathShortcuts'], value: Components.TransformShapeColorIndices): void
	(settingsPathShortcut: TypePathShortcuts['UnitPathShortcuts'], value: Components.Unit): void
	(settingsPathShortcut: TypePathShortcuts['WeavePathShortcuts'], value: Components.Weave): void
}

export { SetSetting }
