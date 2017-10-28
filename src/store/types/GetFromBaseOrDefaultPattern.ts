import * as Settings from './settings'
import { Frame } from '../../animation'
import * as Components from '../../components'
import { Layer } from '../../execute'
import { Px } from '../../page'
import { Color } from '../../render'
import { Radian } from '../../space'
import { MissingSettingsPathShortcut } from './MissingSettingsPathShortcut'
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

interface GetFromBaseOrDefaultPattern {
	(settingsPathShortcut: AnimationSettingsPathShortcut): Settings.AnimationSettings
	(settingsPathShortcut: ColorSettingsPathShortcut): Settings.ColorSettings
	(settingsPathShortcut: ColorAssignmentSettingsPathShortcut): Settings.ColorAssignmentSettings
	(settingsPathShortcut: GridSettingsPathShortcut): Settings.GridSettings
	(settingsPathShortcut: LayerSettingsPathShortcut): Settings.LayerSettings
	(settingsPathShortcut: StripeSettingsPathShortcut): Settings.StripeSettings
	(settingsPathShortcut: StripeCountContinuumSettingsPathShortcut): Settings.StripeCountContinuumSettings
	(settingsPathShortcut: StripePositionSettingsPathShortcut): Settings.StripePositionSettings
	(settingsPathShortcut: TextureSettingsPathShortcut): Settings.TextureSettings
	(settingsPathShortcut: TileSettingsPathShortcut): Settings.TileSettings
	(settingsPathShortcut: ViewSettingsPathShortcut): Settings.ViewSettings
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
