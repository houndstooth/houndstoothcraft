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
	readonly animationSettings: Partial<animationSettings.AnimationSettings>,
	readonly colorSettings: Partial<colorSettings.ColorSettings>,
	readonly gridSettings: Partial<gridSettings.GridSettings>,
	readonly layerSettings: Partial<layerSettings.LayerSettings>,
	readonly stripeSettings: Partial<stripeSettings.StripeSettings>,
	readonly textureSettings: Partial<textureSettings.TextureSettings>,
	readonly tileSettings: Partial<tileSettings.TileSettings>,
	readonly viewSettings: Partial<viewSettings.ViewSettings>,
}

type Effect = Partial<Houndstooth>

enum MissingSettingsName {}

interface SettingsNamesToTypesMap { // Should these settings ones also be Partial, like they are for SetSetting?
	(settingName: animationSettings.AnimationSettingsName): animationSettings.AnimationSettings,
	(settingName: colorSettings.ColorSettingsName): colorSettings.ColorSettings,
	(settingName: colorAssignmentSettings.ColorAssignmentSettingsName): colorAssignmentSettings.ColorAssignmentSettings,
	(settingName: gridSettings.GridSettingsName): gridSettings.GridSettings,
	(settingName: layerSettings.LayerSettingsName): layerSettings.LayerSettings,
	(settingName: stripeSettings.StripeSettingsName): stripeSettings.StripeSettings,
	(settingName: stripeCountContinuumSettings.StripeCountContinuumSettingsName): stripeCountContinuumSettings.StripeCountContinuumSettings,
	(settingName: stripePositionSettings.StripePositionSettingsName): stripePositionSettings.StripePositionSettings,
	(settingName: textureSettings.TextureSettingsName): textureSettings.TextureSettings,
	(settingName: tileSettings.TileSettingsName): tileSettings.TileSettings,
	(settingName: viewSettings.ViewSettingsName): viewSettings.ViewSettings,
	(settingName: SettingsNamesByType['AssignmentModeTypedSettingsNames']): Components.AssignmentMode,
	(settingName: SettingsNamesByType['BaseStripeDiagonalTypedSettingsNames']): Components.BaseStripeDiagonal,
	(settingName: SettingsNamesByType['BooleanTypedSettingsNames']): boolean,
	(settingName: SettingsNamesByType['ColorTypedSettingsNames']): Color,
	(settingName: SettingsNamesByType['ColorsTypedSettingsNames']): Color[],
	(settingName: SettingsNamesByType['ColorSetTypedSettingsNames']): Components.ColorSet,
	(settingName: SettingsNamesByType['ExecuteTextureTypedSettingsNames']): Components.ExecuteTexture,
	(settingName: SettingsNamesByType['FrameTypedSettingsNames']): Frame,
	(settingName: SettingsNamesByType['GetStripePositionsTypedSettingsNames']): Components.GetStripePositions,
	(settingName: SettingsNamesByType['GetTileOriginAndSizeTypedSettingsNames']): Components.GetTileOriginAndSize,
	(settingName: SettingsNamesByType['LayerTypedSettingsNames']): Layer,
	(settingName: SettingsNamesByType['NumberTypedSettingsNames']): number,
	(settingName: SettingsNamesByType['OffsetAddressTypedSettingsNames']): Components.OffsetAddress,
	(settingName: SettingsNamesByType['PxTypedSettingsNames']): Px,
	(settingName: SettingsNamesByType['RadianTypedSettingsNames']): Radian,
	(settingName: SettingsNamesByType['StripeCountModeTypedSettingsNames']): Components.StripeCountMode,
	(settingName: SettingsNamesByType['SupertileTypedSettingsNames']): Components.Supertile,
	(settingName: SettingsNamesByType['TransformShapeColorIndicesTypedSettingsNames']): Components.TransformShapeColorIndices,
	(settingName: SettingsNamesByType['UnitTypedSettingsNames']): Components.Unit,
	(settingName: SettingsNamesByType['WeaveTypedSettingsNames']): Components.Weave,
	(settingName: {}): MissingSettingsName,
}

interface Houndstooth {
	readonly animationsPattern: PatternFunctions,
	readonly basePattern: Partial<BasePattern>,
	readonly layersPattern: PatternFunctions,
	readonly name: string,
}

type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Overwrite<T, U> = { [P in Diff<keyof T, keyof U>]: T[P] } & U;

type Pattern = Partial<BasePattern> | PatternFunctions

interface PatternFunctions {
	readonly animationSettings?: Partial<animationSettings.AnimationSettingsFunctions>,
	readonly colorSettings?: Partial<colorSettings.ColorSettingsFunctions>,
	readonly gridSettings?: Partial<gridSettings.GridSettingsFunctions>,
	readonly layerSettings?: Partial<layerSettings.LayerSettingsFunctions>,
	readonly stripeSettings?: Partial<stripeSettings.StripeSettingsFunctions>,
	readonly textureSettings?: Partial<textureSettings.TextureSettingsFunctions>,
	readonly tileSettings?: Partial<tileSettings.TileSettingsFunctions>,
	readonly viewSettings?: Partial<viewSettings.ViewSettingsFunctions>,
}

interface SetSetting {
	(settingName: animationSettings.AnimationSettingsName, value: Partial<animationSettings.AnimationSettings>): void,
	(settingName: colorSettings.ColorSettingsName, value: Partial<colorSettings.ColorSettings>): void,
	(settingName: colorAssignmentSettings.ColorAssignmentSettingsName, value: Partial<colorAssignmentSettings.ColorAssignmentSettings>): void,
	(settingName: gridSettings.GridSettingsName, value: Partial<gridSettings.GridSettings>): void,
	(settingName: layerSettings.LayerSettingsName, value: Partial<layerSettings.LayerSettings>): void,
	(settingName: stripeSettings.StripeSettingsName, value: Partial<stripeSettings.StripeSettings>): void,
	(settingName: stripeCountContinuumSettings.StripeCountContinuumSettingsName, value: Partial<stripeCountContinuumSettings.StripeCountContinuumSettings>): void,
	(settingName: stripePositionSettings.StripePositionSettingsName, value: Partial<stripePositionSettings.StripePositionSettings>): void,
	(settingName: textureSettings.TextureSettingsName, value: Partial<textureSettings.TextureSettings>): void,
	(settingName: tileSettings.TileSettingsName, value: Partial<tileSettings.TileSettings>): void,
	(settingName: viewSettings.ViewSettingsName, value: Partial<viewSettings.ViewSettings>): void,
	(settingName: SettingsNamesByType['AssignmentModeTypedSettingsNames'], value: Components.AssignmentMode): void,
	(settingName: SettingsNamesByType['BaseStripeDiagonalTypedSettingsNames'], value: Components.BaseStripeDiagonal): void,
	(settingName: SettingsNamesByType['BooleanTypedSettingsNames'], value: boolean): void,
	(settingName: SettingsNamesByType['ColorTypedSettingsNames'], value: Color): void,
	(settingName: SettingsNamesByType['ColorSetTypedSettingsNames'], value: Components.ColorSet): void,
	(settingName: SettingsNamesByType['ColorsTypedSettingsNames'], value: Color[]): void,
	(settingName: SettingsNamesByType['ExecuteTextureTypedSettingsNames'], value: Components.ExecuteTexture): void,
	(settingName: SettingsNamesByType['FrameTypedSettingsNames'], value: Frame): void,
	(settingName: SettingsNamesByType['GetStripePositionsTypedSettingsNames'], value: Components.GetStripePositions): void,
	(settingName: SettingsNamesByType['GetTileOriginAndSizeTypedSettingsNames'], value: Components.GetTileOriginAndSize): void,
	(settingName: SettingsNamesByType['LayerTypedSettingsNames'], value: Layer): void,
	(settingName: SettingsNamesByType['NumberTypedSettingsNames'], value: number): void,
	(settingName: SettingsNamesByType['OffsetAddressTypedSettingsNames'], value: Components.OffsetAddress): void,
	(settingName: SettingsNamesByType['PxTypedSettingsNames'], value: Px): void,
	(settingName: SettingsNamesByType['RadianTypedSettingsNames'], value: Radian): void,
	(settingName: SettingsNamesByType['StripeCountModeTypedSettingsNames'], value: Components.StripeCountMode): void,
	(settingName: SettingsNamesByType['SupertileTypedSettingsNames'], value: Components.Supertile): void,
	(settingName: SettingsNamesByType['TransformShapeColorIndicesTypedSettingsNames'], value: Components.TransformShapeColorIndices): void,
	(settingName: SettingsNamesByType['UnitTypedSettingsNames'], value: Components.Unit): void,
	(settingName: SettingsNamesByType['WeaveTypedSettingsNames'], value: Components.Weave): void,
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
	readonly mainHoundstooth: Houndstooth,
	mixedDownContext: Context | undefined,
	mixingDown: boolean,
	performanceLogging: boolean,
	selectedHoundstoothEffects: Effect[],
}

type SettingsNamesByType =
	| animationSettings.AnimationSettingsNamesByType
	| colorSettings.ColorSettingsNamesByType
	| gridSettings.GridSettingsNamesByType
	| layerSettings.LayerSettingsNamesByType
	| stripeSettings.StripeSettingsNamesByType
	| textureSettings.TextureSettingsNamesByType
	| tileSettings.TileSettingsNamesByType
	| viewSettings.ViewSettingsNamesByType

interface SettingsNamesByTypeBase {
	readonly AssignmentModeTypedSettingsNames: '_',
	readonly BaseStripeDiagonalTypedSettingsNames: '_',
	readonly BooleanTypedSettingsNames: '_',
	readonly ColorSetTypedSettingsNames: '_',
	readonly ColorsTypedSettingsNames: '_',
	readonly ColorTypedSettingsNames: '_',
	readonly ExecuteTextureTypedSettingsNames: '_',
	readonly FrameTypedSettingsNames: '_',
	readonly GetStripePositionsTypedSettingsNames: '_',
	readonly GetTileOriginAndSizeTypedSettingsNames: '_',
	readonly LayerTypedSettingsNames: '_',
	readonly NumberTypedSettingsNames: '_',
	readonly OffsetAddressTypedSettingsNames: '_',
	readonly PxTypedSettingsNames: '_',
	readonly RadianTypedSettingsNames: '_',
	readonly StripeCountModeTypedSettingsNames: '_',
	readonly SupertileTypedSettingsNames: '_',
	readonly TransformShapeColorIndicesTypedSettingsNames: '_',
	readonly UnitTypedSettingsNames: '_',
	readonly WeaveTypedSettingsNames: '_',
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
	SettingsNamesByTypeBase,
	SettingsNamesToTypesMap,
	SetSetting,
}
