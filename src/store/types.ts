// tslint:disable:max-file-line-count max-line-length

import {
	AnimationSettings,
	ColorAssignmentSettings,
	ColorSettings,
	GridSettings,
	LayerSettings,
	StripeSettings,
	StripeCountContinuumSettings,
	TextureSettings,
	TileSettings,
	ViewSettings,
	StripePositionSettings,
} from './settings'
import { Context, Px } from '../page'
import { Frame } from '../animation'
import { Layer } from '../execute'
import { Radian } from '../space'
import { Color } from '../render'
import * as Components from '../components'


interface BasePattern {
	animationSettings: Partial<AnimationSettings.AnimationSettings>,
	colorSettings: Partial<ColorSettings.ColorSettings>,
	gridSettings: Partial<GridSettings.GridSettings>,
	layerSettings: Partial<LayerSettings.LayerSettings>,
	stripeSettings: Partial<StripeSettings.StripeSettings>,
	textureSettings: Partial<TextureSettings.TextureSettings>,
	tileSettings: Partial<TileSettings.TileSettings>,
	viewSettings: Partial<ViewSettings.ViewSettings>,
}

type Effect = Partial<Houndstooth>

enum MissingSettingsPathShortcut {}

interface GetFromBaseOrDefaultPattern {
	(settingsPathShortcut: AnimationSettings.AnimationSettingsPathShortcut): AnimationSettings.AnimationSettings

	(settingsPathShortcut: ColorSettings.ColorSettingsPathShortcut): ColorSettings.ColorSettings

	(settingsPathShortcut: ColorAssignmentSettings.ColorAssignmentSettingsPathShortcut): ColorAssignmentSettings.ColorAssignmentSettings

	(settingsPathShortcut: GridSettings.GridSettingsPathShortcut): GridSettings.GridSettings

	(settingsPathShortcut: LayerSettings.LayerSettingsPathShortcut): LayerSettings.LayerSettings

	(settingsPathShortcut: StripeSettings.StripeSettingsPathShortcut): StripeSettings.StripeSettings

	(settingsPathShortcut: StripeCountContinuumSettings.StripeCountContinuumSettingsPathShortcut): StripeCountContinuumSettings.StripeCountContinuumSettings

	(settingsPathShortcut: StripePositionSettings.StripePositionSettingsPathShortcut): StripePositionSettings.StripePositionSettings

	(settingsPathShortcut: TextureSettings.TextureSettingsPathShortcut): TextureSettings.TextureSettings

	(settingsPathShortcut: TileSettings.TileSettingsPathShortcut): TileSettings.TileSettings

	(settingsPathShortcut: ViewSettings.ViewSettingsPathShortcut): ViewSettings.ViewSettings

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
	animationSettings?: Partial<AnimationSettings.AnimationSettingsFunctions>,
	colorSettings?: Partial<ColorSettings.ColorSettingsFunctions>,
	gridSettings?: Partial<GridSettings.GridSettingsFunctions>,
	layerSettings?: Partial<LayerSettings.LayerSettingsFunctions>,
	stripeSettings?: Partial<StripeSettings.StripeSettingsFunctions>,
	textureSettings?: Partial<TextureSettings.TextureSettingsFunctions>,
	tileSettings?: Partial<TileSettings.TileSettingsFunctions>,
	viewSettings?: Partial<ViewSettings.ViewSettingsFunctions>,
}

interface SetSetting {
	(settingsPathShortcut: AnimationSettings.AnimationSettingsPathShortcut, value: AnimationSettings.AnimationSettings): void

	(settingsPathShortcut: ColorSettings.ColorSettingsPathShortcut, value: ColorSettings.ColorSettings): void

	(settingsPathShortcut: ColorAssignmentSettings.ColorAssignmentSettingsPathShortcut, value: ColorAssignmentSettings.ColorAssignmentSettings): void

	(settingsPathShortcut: GridSettings.GridSettingsPathShortcut, value: GridSettings.GridSettings): void

	(settingsPathShortcut: LayerSettings.LayerSettingsPathShortcut, value: LayerSettings.LayerSettings): void

	(settingsPathShortcut: StripeSettings.StripeSettingsPathShortcut, value: StripeSettings.StripeSettings): void

	(settingsPathShortcut: StripeCountContinuumSettings.StripeCountContinuumSettingsPathShortcut, value: StripeCountContinuumSettings.StripeCountContinuumSettings): void

	(settingsPathShortcut: StripePositionSettings.StripePositionSettingsPathShortcut, value: StripePositionSettings.StripePositionSettings): void

	(settingsPathShortcut: TextureSettings.TextureSettingsPathShortcut, value: TextureSettings.TextureSettings): void

	(settingsPathShortcut: TileSettings.TileSettingsPathShortcut, value: TileSettings.TileSettings): void

	(settingsPathShortcut: ViewSettings.ViewSettingsPathShortcut, value: ViewSettings.ViewSettings): void

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
	| AnimationSettings.AnimationSettingsTypePathShortcuts
	| ColorSettings.ColorSettingsTypePathShortcuts
	| GridSettings.GridSettingsTypePathShortcuts
	| LayerSettings.LayerSettingsTypePathShortcuts
	| StripeSettings.StripeSettingsTypePathShortcuts
	| TextureSettings.TextureSettingsTypePathShortcuts
	| TileSettings.TileSettingsTypePathShortcuts
	| ViewSettings.ViewSettingsTypePathShortcuts

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
