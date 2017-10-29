// tslint:disable:max-file-line-count max-line-length

import { Frame } from '../animation'
import * as Components from '../components'
import { Layer } from '../execute'
import { Context, Px } from '../page'
import { Color } from '../render'
import { Radian } from '../space'
import {
	animationSettings,
	colorAssignmentSettings,
	colorSettings,
	gridSettings,
	layerSettings,
	stripeCountContinuumSettings,
	stripePositionSettings,
	stripeSettings,
	textureSettings,
	tileSettings,
	viewSettings,
} from './settings'

interface BasePattern {
	animationSettings: Partial<animationSettings.AnimationSettings>,
	colorSettings: Partial<colorSettings.ColorSettings>,
	gridSettings: Partial<gridSettings.GridSettings>,
	layerSettings: Partial<layerSettings.LayerSettings>,
	stripeSettings: Partial<stripeSettings.StripeSettings>,
	textureSettings: Partial<textureSettings.TextureSettings>,
	tileSettings: Partial<tileSettings.TileSettings>,
	viewSettings: Partial<viewSettings.ViewSettings>,
}

type Effect = Partial<Houndstooth>

enum MissingSettingsPathShortcut {}

interface GetFromBaseOrDefaultPattern {
	(settingsPathShortcut: animationSettings.AnimationSettingsPathShortcut): animationSettings.AnimationSettings,
	(settingsPathShortcut: colorSettings.ColorSettingsPathShortcut): colorSettings.ColorSettings,
	(settingsPathShortcut: colorAssignmentSettings.ColorAssignmentSettingsPathShortcut): colorAssignmentSettings.ColorAssignmentSettings,
	(settingsPathShortcut: gridSettings.GridSettingsPathShortcut): gridSettings.GridSettings,
	(settingsPathShortcut: layerSettings.LayerSettingsPathShortcut): layerSettings.LayerSettings,
	(settingsPathShortcut: stripeSettings.StripeSettingsPathShortcut): stripeSettings.StripeSettings,
	(settingsPathShortcut: stripeCountContinuumSettings.StripeCountContinuumSettingsPathShortcut): stripeCountContinuumSettings.StripeCountContinuumSettings,
	(settingsPathShortcut: stripePositionSettings.StripePositionSettingsPathShortcut): stripePositionSettings.StripePositionSettings,
	(settingsPathShortcut: textureSettings.TextureSettingsPathShortcut): textureSettings.TextureSettings,
	(settingsPathShortcut: tileSettings.TileSettingsPathShortcut): tileSettings.TileSettings,
	(settingsPathShortcut: viewSettings.ViewSettingsPathShortcut): viewSettings.ViewSettings,
	(settingsPathShortcut: TypePathShortcuts['AssignmentModePathShortcuts']): Components.AssignmentMode,
	(settingsPathShortcut: TypePathShortcuts['BaseStripeDiagonalPathShortcuts']): Components.BaseStripeDiagonal,
	(settingsPathShortcut: TypePathShortcuts['BooleanPathShortcuts']): boolean,
	(settingsPathShortcut: TypePathShortcuts['ColorPathShortcuts']): Color,
	(settingsPathShortcut: TypePathShortcuts['ColorsPathShortcuts']): Color[],
	(settingsPathShortcut: TypePathShortcuts['ColorSetPathShortcuts']): Components.ColorSet,
	(settingsPathShortcut: TypePathShortcuts['ExecuteTexturePathShortcuts']): Components.ExecuteTexture,
	(settingsPathShortcut: TypePathShortcuts['FramePathShortcuts']): Frame,
	(settingsPathShortcut: TypePathShortcuts['GetStripePositionsPathShortcuts']): Components.GetStripePositions,
	(settingsPathShortcut: TypePathShortcuts['GetTileOriginAndSizePathShortcuts']): Components.GetTileOriginAndSize,
	(settingsPathShortcut: TypePathShortcuts['LayerPathShortcuts']): Layer,
	(settingsPathShortcut: TypePathShortcuts['NumberPathShortcuts']): number,
	(settingsPathShortcut: TypePathShortcuts['OffsetAddressPathShortcuts']): Components.OffsetAddress,
	(settingsPathShortcut: TypePathShortcuts['PxPathShortcuts']): Px,
	(settingsPathShortcut: TypePathShortcuts['RadianPathShortcuts']): Radian,
	(settingsPathShortcut: TypePathShortcuts['StripeCountModePathShortcuts']): Components.StripeCountMode,
	(settingsPathShortcut: TypePathShortcuts['SupertilePathShortcuts']): Components.Supertile,
	(settingsPathShortcut: TypePathShortcuts['TransformShapeColorIndicesPathShortcuts']): Components.TransformShapeColorIndices,
	(settingsPathShortcut: TypePathShortcuts['UnitPathShortcuts']): Components.Unit,
	(settingsPathShortcut: TypePathShortcuts['WeavePathShortcuts']): Components.Weave,
	(settingsPathShortcut: {}): MissingSettingsPathShortcut,
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
	animationSettings?: Partial<animationSettings.AnimationSettingsFunctions>,
	colorSettings?: Partial<colorSettings.ColorSettingsFunctions>,
	gridSettings?: Partial<gridSettings.GridSettingsFunctions>,
	layerSettings?: Partial<layerSettings.LayerSettingsFunctions>,
	stripeSettings?: Partial<stripeSettings.StripeSettingsFunctions>,
	textureSettings?: Partial<textureSettings.TextureSettingsFunctions>,
	tileSettings?: Partial<tileSettings.TileSettingsFunctions>,
	viewSettings?: Partial<viewSettings.ViewSettingsFunctions>,
}

interface SetSetting {
	(settingsPathShortcut: animationSettings.AnimationSettingsPathShortcut, value: animationSettings.AnimationSettings): void,
	(settingsPathShortcut: colorSettings.ColorSettingsPathShortcut, value: colorSettings.ColorSettings): void,
	(settingsPathShortcut: colorAssignmentSettings.ColorAssignmentSettingsPathShortcut, value: colorAssignmentSettings.ColorAssignmentSettings): void,
	(settingsPathShortcut: gridSettings.GridSettingsPathShortcut, value: gridSettings.GridSettings): void,
	(settingsPathShortcut: layerSettings.LayerSettingsPathShortcut, value: layerSettings.LayerSettings): void,
	(settingsPathShortcut: stripeSettings.StripeSettingsPathShortcut, value: stripeSettings.StripeSettings): void,
	(settingsPathShortcut: stripeCountContinuumSettings.StripeCountContinuumSettingsPathShortcut, value: stripeCountContinuumSettings.StripeCountContinuumSettings): void,
	(settingsPathShortcut: stripePositionSettings.StripePositionSettingsPathShortcut, value: stripePositionSettings.StripePositionSettings): void,
	(settingsPathShortcut: textureSettings.TextureSettingsPathShortcut, value: textureSettings.TextureSettings): void,
	(settingsPathShortcut: tileSettings.TileSettingsPathShortcut, value: tileSettings.TileSettings): void,
	(settingsPathShortcut: viewSettings.ViewSettingsPathShortcut, value: viewSettings.ViewSettings): void,
	(settingsPathShortcut: TypePathShortcuts['AssignmentModePathShortcuts'], value: Components.AssignmentMode): void,
	(settingsPathShortcut: TypePathShortcuts['BaseStripeDiagonalPathShortcuts'], value: Components.BaseStripeDiagonal): void,
	(settingsPathShortcut: TypePathShortcuts['BooleanPathShortcuts'], value: boolean): void,
	(settingsPathShortcut: TypePathShortcuts['ColorPathShortcuts'], value: Color): void,
	(settingsPathShortcut: TypePathShortcuts['ColorSetPathShortcuts'], value: Components.ColorSet): void,
	(settingsPathShortcut: TypePathShortcuts['ColorsPathShortcuts'], value: Color[]): void,
	(settingsPathShortcut: TypePathShortcuts['ExecuteTexturePathShortcuts'], value: Components.ExecuteTexture): void,
	(settingsPathShortcut: TypePathShortcuts['FramePathShortcuts'], value: Frame): void,
	(settingsPathShortcut: TypePathShortcuts['GetStripePositionsPathShortcuts'], value: Components.GetStripePositions): void,
	(settingsPathShortcut: TypePathShortcuts['GetTileOriginAndSizePathShortcuts'], value: Components.GetTileOriginAndSize): void,
	(settingsPathShortcut: TypePathShortcuts['LayerPathShortcuts'], value: Layer): void,
	(settingsPathShortcut: TypePathShortcuts['NumberPathShortcuts'], value: number): void,
	(settingsPathShortcut: TypePathShortcuts['OffsetAddressPathShortcuts'], value: Components.OffsetAddress): void,
	(settingsPathShortcut: TypePathShortcuts['PxPathShortcuts'], value: Px): void,
	(settingsPathShortcut: TypePathShortcuts['RadianPathShortcuts'], value: Radian): void,
	(settingsPathShortcut: TypePathShortcuts['StripeCountModePathShortcuts'], value: Components.StripeCountMode): void,
	(settingsPathShortcut: TypePathShortcuts['SupertilePathShortcuts'], value: Components.Supertile): void,
	(settingsPathShortcut: TypePathShortcuts['TransformShapeColorIndicesPathShortcuts'], value: Components.TransformShapeColorIndices): void,
	(settingsPathShortcut: TypePathShortcuts['UnitPathShortcuts'], value: Components.Unit): void,
	(settingsPathShortcut: TypePathShortcuts['WeavePathShortcuts'], value: Components.Weave): void,
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
	| animationSettings.AnimationSettingsTypePathShortcuts
	| colorSettings.ColorSettingsTypePathShortcuts
	| gridSettings.GridSettingsTypePathShortcuts
	| layerSettings.LayerSettingsTypePathShortcuts
	| stripeSettings.StripeSettingsTypePathShortcuts
	| textureSettings.TextureSettingsTypePathShortcuts
	| tileSettings.TileSettingsTypePathShortcuts
	| viewSettings.ViewSettingsTypePathShortcuts

interface TypePathShortcutsBase {
	AssignmentModePathShortcuts: '_',
	BaseStripeDiagonalPathShortcuts: '_',
	BooleanPathShortcuts: '_',
	ColorPathShortcuts: '_',
	ColorSetPathShortcuts: '_',
	ColorsPathShortcuts: '_',
	ExecuteTexturePathShortcuts: '_',
	FramePathShortcuts: '_',
	GetStripePositionsPathShortcuts: '_',
	GetTileOriginAndSizePathShortcuts: '_',
	LayerPathShortcuts: '_',
	NumberPathShortcuts: '_',
	OffsetAddressPathShortcuts: '_',
	PxPathShortcuts: '_',
	RadianPathShortcuts: '_',
	StripeCountModePathShortcuts: '_',
	SupertilePathShortcuts: '_',
	TransformShapeColorIndicesPathShortcuts: '_',
	UnitPathShortcuts: '_',
	WeavePathShortcuts: '_',
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
