// tslint:disable:max-line-length

import * as Settings from './settings'
import { Frame } from '../../animation'
import * as Components from '../../components'
import { Layer } from '../../execute'
import { Px } from '../../page'
import { Color } from '../../render'
import { Radian } from '../../space'
import * as SettingsPathShortcuts from './SettingsPathShortcuts';
import { TypePathShortcuts } from './TypePathShortcuts'

enum MissingSettingsPathShortcut {}

interface GetFromBaseOrDefaultPattern {
	(settingsPathShortcut: SettingsPathShortcuts.AnimationSettingsPathShortcut): Settings.AnimationSettings
	(settingsPathShortcut: SettingsPathShortcuts.ColorSettingsPathShortcut): Settings.ColorSettings
	(settingsPathShortcut: SettingsPathShortcuts.ColorAssignmentSettingsPathShortcut): Settings.ColorAssignmentSettings
	(settingsPathShortcut: SettingsPathShortcuts.GridSettingsPathShortcut): Settings.GridSettings
	(settingsPathShortcut: SettingsPathShortcuts.LayerSettingsPathShortcut): Settings.LayerSettings
	(settingsPathShortcut: SettingsPathShortcuts.StripeSettingsPathShortcut): Settings.StripeSettings
	(settingsPathShortcut: SettingsPathShortcuts.StripeCountContinuumSettingsPathShortcut): Settings.StripeCountContinuumSettings
	(settingsPathShortcut: SettingsPathShortcuts.StripePositionSettingsPathShortcut): Settings.StripePositionSettings
	(settingsPathShortcut: SettingsPathShortcuts.TextureSettingsPathShortcut): Settings.TextureSettings
	(settingsPathShortcut: SettingsPathShortcuts.TileSettingsPathShortcut): Settings.TileSettings
	(settingsPathShortcut: SettingsPathShortcuts.ViewSettingsPathShortcut): Settings.ViewSettings
	(settingsPathShortcut: TypePathShortcuts['AssignmentModePathShortcuts']): Components.AssignmentMode
	(settingsPathShortcut: TypePathShortcuts['BaseStripeDiagonalPathShortcuts']): Components.BaseStripeDiagonal
	(settingsPathShortcut: TypePathShortcuts['BooleanPathShortcuts']): boolean
	(settingsPathShortcut: TypePathShortcuts['ColorPathShortcuts']): Color
	(settingsPathShortcut: TypePathShortcuts['ColorsPathShortcuts']): Color[]
	(settingsPathShortcut: TypePathShortcuts['ColorSetPathShortcuts']): Components.ColorSet
	(settingsPathShortcut: TypePathShortcuts['ExecuteTexturePathShortcuts']): Components.ExecuteTexture
	(settingsPathShortcut: TypePathShortcuts['FramePathShortcuts']): Frame
	(settingsPathShortcut: TypePathShortcuts['GetStripePositionsPathShortcuts']): Components.GetStripePositions
	(settingsPathShortcut: TypePathShortcuts['GetTileOriginAndSizePathShortcuts']): Components.GetTileOriginAndSize
	(settingsPathShortcut: TypePathShortcuts['LayerPathShortcuts']): Layer
	(settingsPathShortcut: TypePathShortcuts['NumberPathShortcuts']): number
	(settingsPathShortcut: TypePathShortcuts['OffsetAddressPathShortcuts']): Components.OffsetAddress
	(settingsPathShortcut: TypePathShortcuts['PxPathShortcuts']): Px
	(settingsPathShortcut: TypePathShortcuts['RadianPathShortcuts']): Radian
	(settingsPathShortcut: TypePathShortcuts['StripeCountModePathShortcuts']): Components.StripeCountMode
	(settingsPathShortcut: TypePathShortcuts['SupertilePathShortcuts']): Components.Supertile
	(settingsPathShortcut: TypePathShortcuts['TransformShapeColorIndicesPathShortcuts']): Components.TransformShapeColorIndices
	(settingsPathShortcut: TypePathShortcuts['UnitPathShortcuts']): Components.Unit
	(settingsPathShortcut: TypePathShortcuts['WeavePathShortcuts']): Components.Weave
	(settingsPathShortcut: {}): MissingSettingsPathShortcut
}

export { GetFromBaseOrDefaultPattern }
