import * as Settings from './settings'
import { Frame } from '../../animation'
import * as Components from '../../components'
import { Layer } from '../../execute'
import { Px } from '../../page'
import { Color } from '../../render'
import { Radian } from '../../space'
import { TypePathShortcuts } from './TypePathShortcuts'
import { AnimationSettingsPathShortcut } from './settings/AnimationSettings'
import { ColorSettingsPathShortcut } from './settings/ColorSettings'
import { ColorAssignmentSettingsPathShortcut } from './settings/color/ColorAssignmentSettings'
import { GridSettingsPathShortcut } from './settings/GridSettings'
import { LayerSettingsPathShortcut } from './settings/LayerSettings'
import { StripeSettingsPathShortcut } from './settings/StripeSettings'
import { StripeCountContinuumSettingsPathShortcut } from './settings/stripe/stripePosition/StripeCountContinuumSettings'
import { StripePositionSettingsPathShortcut } from './settings/stripe/StripePositionSettings'
import { TextureSettingsPathShortcut } from './settings/TextureSettings'
import { TileSettingsPathShortcut } from './settings/TileSettings'
import { ViewSettingsPathShortcut } from './settings/ViewSettings'

interface SetSetting {
	(settingsPathShortcut: AnimationSettingsPathShortcut, value: Settings.AnimationSettings): void
	(settingsPathShortcut: ColorSettingsPathShortcut, value: Settings.ColorSettings): void
	(settingsPathShortcut: ColorAssignmentSettingsPathShortcut, value: Settings.ColorAssignmentSettings): void
	(settingsPathShortcut: GridSettingsPathShortcut, value: Settings.GridSettings): void
	(settingsPathShortcut: LayerSettingsPathShortcut, value: Settings.LayerSettings): void
	(settingsPathShortcut: StripeSettingsPathShortcut, value: Settings.StripeSettings): void
	(settingsPathShortcut: StripeCountContinuumSettingsPathShortcut, value: Settings.StripeCountContinuumSettings): void
	(settingsPathShortcut: StripePositionSettingsPathShortcut, value: Settings.StripePositionSettings): void
	(settingsPathShortcut: TextureSettingsPathShortcut, value: Settings.TextureSettings): void
	(settingsPathShortcut: TileSettingsPathShortcut, value: Settings.TileSettings): void
	(settingsPathShortcut: ViewSettingsPathShortcut, value: Settings.ViewSettings): void
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
