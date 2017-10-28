// tslint:disable:max-file-line-count max-line-length

import * as settings from './settings'
import { Context, Px } from '../page/types'
import { Frame } from '../animation/types'
import { Layer } from '../execute/types'
import {
	AnimationSettingsFunctions, AnimationSettingsPathShortcut,
	AnimationSettingsTypePathShortcuts,
} from './settings/AnimationSettings'
import {
	ColorSettingsFunctions, ColorSettingsPathShortcut,
	ColorSettingsTypePathShortcuts,
} from './settings/ColorSettings'
import { GridSettingsFunctions, GridSettingsPathShortcut, GridSettingsTypePathShortcuts } from './settings/GridSettings'
import {
	LayerSettingsFunctions, LayerSettingsPathShortcut,
	LayerSettingsTypePathShortcuts,
} from './settings/LayerSettings'
import {
	StripeSettingsFunctions, StripeSettingsPathShortcut,
	StripeSettingsTypePathShortcuts,
} from './settings/StripeSettings'
import {
	TextureSettingsFunctions, TextureSettingsPathShortcut,
	TextureSettingsTypePathShortcuts,
} from './settings/TextureSettings'
import { TileSettingsFunctions, TileSettingsPathShortcut, TileSettingsTypePathShortcuts } from './settings/TileSettings'
import { ViewSettingsFunctions, ViewSettingsPathShortcut, ViewSettingsTypePathShortcuts } from './settings/ViewSettings'
import { Radian } from '../space/types'
import { Color } from '../render/types'
import * as Components from '../components'
import { ColorAssignmentSettingsPathShortcut } from './settings/color/ColorAssignmentSettings'
import { StripeCountContinuumSettingsPathShortcut } from './settings/stripe/stripePosition/StripeCountContinuumSettings'
import { StripePositionSettingsPathShortcut } from './settings/stripe/StripePositionSettings'

interface BasePattern {
	animationSettings: Partial<settings.AnimationSettings>,
	colorSettings: Partial<settings.ColorSettings>,
	gridSettings: Partial<settings.GridSettings>,
	layerSettings: Partial<settings.LayerSettings>,
	stripeSettings: Partial<settings.StripeSettings>,
	textureSettings: Partial<settings.TextureSettings>,
	tileSettings: Partial<settings.TileSettings>,
	viewSettings: Partial<settings.ViewSettings>,
}

type Effect = Partial<Houndstooth>

enum MissingSettingsPathShortcut {}

interface GetFromBaseOrDefaultPattern {
	(settingsPathShortcut: AnimationSettingsPathShortcut): settings.AnimationSettings

	(settingsPathShortcut: ColorSettingsPathShortcut): settings.ColorSettings

	(settingsPathShortcut: ColorAssignmentSettingsPathShortcut): settings.ColorAssignmentSettings

	(settingsPathShortcut: GridSettingsPathShortcut): settings.GridSettings

	(settingsPathShortcut: LayerSettingsPathShortcut): settings.LayerSettings

	(settingsPathShortcut: StripeSettingsPathShortcut): settings.StripeSettings

	(settingsPathShortcut: StripeCountContinuumSettingsPathShortcut): settings.StripeCountContinuumSettings

	(settingsPathShortcut: StripePositionSettingsPathShortcut): settings.StripePositionSettings

	(settingsPathShortcut: TextureSettingsPathShortcut): settings.TextureSettings

	(settingsPathShortcut: TileSettingsPathShortcut): settings.TileSettings

	(settingsPathShortcut: ViewSettingsPathShortcut): settings.ViewSettings

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

interface Houndstooth {
	animationsPattern: PatternFunctions,
	basePattern: Partial<BasePattern>,
	layersPattern: PatternFunctions,
	name: string,
}

type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Overwrite<T, U> = { [P in Diff<keyof T, keyof U>]: T[P] } & U;

type Pattern = Partial<BasePattern> | PatternFunctions

interface PatternFunctions {
	animationSettings?: Partial<AnimationSettingsFunctions>,
	colorSettings?: Partial<ColorSettingsFunctions>,
	gridSettings?: Partial<GridSettingsFunctions>,
	layerSettings?: Partial<LayerSettingsFunctions>,
	stripeSettings?: Partial<StripeSettingsFunctions>,
	textureSettings?: Partial<TextureSettingsFunctions>,
	tileSettings?: Partial<TileSettingsFunctions>,
	viewSettings?: Partial<ViewSettingsFunctions>,
}

interface SetSetting {
	(settingsPathShortcut: AnimationSettingsPathShortcut, value: settings.AnimationSettings): void

	(settingsPathShortcut: ColorSettingsPathShortcut, value: settings.ColorSettings): void

	(settingsPathShortcut: ColorAssignmentSettingsPathShortcut, value: settings.ColorAssignmentSettings): void

	(settingsPathShortcut: GridSettingsPathShortcut, value: settings.GridSettings): void

	(settingsPathShortcut: LayerSettingsPathShortcut, value: settings.LayerSettings): void

	(settingsPathShortcut: StripeSettingsPathShortcut, value: settings.StripeSettings): void

	(settingsPathShortcut: StripeCountContinuumSettingsPathShortcut, value: settings.StripeCountContinuumSettings): void

	(settingsPathShortcut: StripePositionSettingsPathShortcut, value: settings.StripePositionSettings): void

	(settingsPathShortcut: TextureSettingsPathShortcut, value: settings.TextureSettings): void

	(settingsPathShortcut: TileSettingsPathShortcut, value: settings.TileSettings): void

	(settingsPathShortcut: ViewSettingsPathShortcut, value: settings.ViewSettings): void

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

enum _SettingsPathBrand {}

type SettingsPath = _SettingsPathBrand & SettingsStep[]

enum _SettingsStepBrand {}

type SettingsStep = _SettingsStepBrand & string;

interface State {
	animating: boolean,
	contexts: Context[],
	currentFrame: Frame,
	currentLayer: Layer,
	exportFrames: boolean,
	interval: (() => void) | undefined,
	lastSavedFrame: Frame,
	mainHoundstooth: Houndstooth,
	mixedDownContext: Context | undefined,
	mixingDown: boolean,
	performanceLogging: boolean,
	selectedHoundstoothEffects: Effect[],
}

type TypePathShortcuts =
	| AnimationSettingsTypePathShortcuts
	| ColorSettingsTypePathShortcuts
	| GridSettingsTypePathShortcuts
	| LayerSettingsTypePathShortcuts
	| StripeSettingsTypePathShortcuts
	| TextureSettingsTypePathShortcuts
	| TileSettingsTypePathShortcuts
	| ViewSettingsTypePathShortcuts

interface TypePathShortcutsBase {
	AssignmentModePathShortcuts: '_'
	BaseStripeDiagonalPathShortcuts: '_'
	BooleanPathShortcuts: '_'
	ColorPathShortcuts: '_'
	ColorSetPathShortcuts: '_'
	ColorsPathShortcuts: '_'
	ExecuteTexturePathShortcuts: '_'
	FramePathShortcuts: '_'
	GetStripePositionsPathShortcuts: '_'
	GetTileOriginAndSizePathShortcuts: '_'
	LayerPathShortcuts: '_'
	NumberPathShortcuts: '_'
	OffsetAddressPathShortcuts: '_'
	PxPathShortcuts: '_'
	RadianPathShortcuts: '_'
	StripeCountModePathShortcuts: '_'
	SupertilePathShortcuts: '_'
	TransformShapeColorIndicesPathShortcuts: '_'
	UnitPathShortcuts: '_'
	WeavePathShortcuts: '_'
}

export {
	Effect,
	Houndstooth,
	Pattern,
	SettingsPath,
	SettingsStep,
	State,
	BasePattern,
	PatternFunctions,
	Overwrite,
	TypePathShortcutsBase,
	GetFromBaseOrDefaultPattern,
	SetSetting,
}
