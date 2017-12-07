// tslint:disable:max-file-line-count max-line-length

import { Px } from '../app'
import { animationSettings } from './animation'
import {
	AssignmentMode,
	Color,
	colorAssignmentSettings,
	ColorSet,
	colorSettings,
	OffsetAddress,
	Supertile,
	TransformShapeColorIndices,
	Weave,
} from './color'
import { gridSettings, Unit } from './grid'
import { Layer, layerSettings } from './layer'
import {
	BaseStripeDiagonal,
	GetStripePositions,
	Radian,
	stripeCountContinuumSettings,
	StripeCountMode,
	stripePositionSettings,
	stripeSettings,
} from './stripe'
import { ExecuteTexture, textureSettings } from './texture'
import { GetTileOriginAndSize, tileSettings } from './tile'
import { viewSettings } from './view'

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

type PatternState = Partial<BasePattern>

interface NamedEffect extends Effect {
	readonly description: string,
	readonly name: string,
}

enum MissingSettingsName {}

interface SettingsNamesToTypesMap {
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
	(settingName: SettingsNamesByType['AssignmentModeTypedSettingsNames']): AssignmentMode,
	(settingName: SettingsNamesByType['BaseStripeDiagonalTypedSettingsNames']): BaseStripeDiagonal,
	(settingName: SettingsNamesByType['BooleanTypedSettingsNames']): boolean,
	(settingName: SettingsNamesByType['ColorTypedSettingsNames']): Color,
	(settingName: SettingsNamesByType['ColorsTypedSettingsNames']): Color[],
	(settingName: SettingsNamesByType['ColorSetTypedSettingsNames']): ColorSet,
	(settingName: SettingsNamesByType['ExecuteTextureTypedSettingsNames']): ExecuteTexture,
	(settingName: SettingsNamesByType['GetStripePositionsTypedSettingsNames']): GetStripePositions,
	(settingName: SettingsNamesByType['GetTileOriginAndSizeTypedSettingsNames']): GetTileOriginAndSize,
	(settingName: SettingsNamesByType['LayerTypedSettingsNames']): Layer,
	(settingName: SettingsNamesByType['NumberTypedSettingsNames']): number,
	(settingName: SettingsNamesByType['OffsetAddressTypedSettingsNames']): OffsetAddress,
	(settingName: SettingsNamesByType['PxTypedSettingsNames']): Px,
	(settingName: SettingsNamesByType['RadianTypedSettingsNames']): Radian,
	(settingName: SettingsNamesByType['StripeCountModeTypedSettingsNames']): StripeCountMode,
	(settingName: SettingsNamesByType['SupertileTypedSettingsNames']): Supertile,
	(settingName: SettingsNamesByType['TransformShapeColorIndicesTypedSettingsNames']): TransformShapeColorIndices,
	(settingName: SettingsNamesByType['UnitTypedSettingsNames']): Unit,
	(settingName: SettingsNamesByType['WeaveTypedSettingsNames']): Weave,
	(settingName: {}): MissingSettingsName,
}

interface Houndstooth {
	readonly animationsPattern: PatternFunctions,
	readonly basePattern: Partial<BasePattern>,
	readonly description: string,
	readonly layersPattern: PatternFunctions,
	readonly name: string,
}

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
	BasePattern,
	PatternState,
	Effect,
	Houndstooth,
	NamedEffect,
	PatternFunctions,
	SettingsNamesByTypeBase,
	SettingsNamesToTypesMap,
	Pattern,
	SettingsNamesByType,
}
