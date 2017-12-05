// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite } from '../../app'
import * as to from '../../to'
import { Unit } from '../grid'
import { SettingsNamesByTypeBase } from '../types'
import getStandardTileOriginAndSize from './getStandardTileOriginAndSize'
import { GetTileOriginAndSize } from './types'

interface TileSettings {
	readonly collapseSameColoredShapesWithinTile: boolean,
	readonly getTileOriginAndSize: GetTileOriginAndSize,
	readonly tileSize: Unit,
	readonly [_: string]: any,
}

type TileSettingsFunctions = FunctionsOf<TileSettings>

const DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE: boolean = true
const DEFAULT_GET_TILE_ORIGIN_AND_SIZE: GetTileOriginAndSize = getStandardTileOriginAndSize
const DEFAULT_TILE_SIZE: Unit = to.Unit(50)

const DEFAULT_TILE_SETTINGS: TileSettings = {
	collapseSameColoredShapesWithinTile: DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE,
	getTileOriginAndSize: DEFAULT_GET_TILE_ORIGIN_AND_SIZE,
	tileSize: DEFAULT_TILE_SIZE,
}

type TileSettingsName = 'tileSettings'

type TileSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'collapseSameColoredShapesWithinTile',
	GetTileOriginAndSizeTypedSettingsNames: 'getTileOriginAndSize',
	UnitTypedSettingsNames: 'tileSize',
}>

export {
	TileSettings,
	TileSettingsFunctions,
	DEFAULT_TILE_SETTINGS,
	TileSettingsName,
	TileSettingsNamesByType,
}
