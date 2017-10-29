// tslint:disable:no-magic-numbers max-file-line-count no-any

import { getStandardTileOriginAndSize, GetTileOriginAndSize, Unit } from '../../components'
import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'

// Structure

interface TileSettingsStructure {
	readonly collapseSameColoredShapesWithinTile: any,
	readonly getTileOriginAndSize: any,
	readonly tileSize: any,
	readonly [_: string]: any,
}

// Type

interface TileSettings extends TileSettingsStructure {
	readonly collapseSameColoredShapesWithinTile: boolean,
	readonly getTileOriginAndSize: GetTileOriginAndSize,
	readonly tileSize: Unit,
}

// Functions of

type TileSettingsFunctions = FunctionsOf<TileSettings>

// Defaults

const DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE = true
const DEFAULT_GET_TILE_ORIGIN_AND_SIZE: GetTileOriginAndSize = getStandardTileOriginAndSize
const DEFAULT_TILE_SIZE: Unit = to.Unit(50)

const DEFAULT_TILE_SETTINGS: TileSettings = {
	collapseSameColoredShapesWithinTile: DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE,
	getTileOriginAndSize: DEFAULT_GET_TILE_ORIGIN_AND_SIZE,
	tileSize: DEFAULT_TILE_SIZE,
}

// Settings name

type TileSettingsName = 'tileSettings'

// Settings names to paths map

const tileSettingsNamesToPathsMap: TileSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'tileSettings' ]),
	settings: DEFAULT_TILE_SETTINGS,
})

// Settings names by type

type TileSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'collapseSameColoredShapesWithinTile',
	GetTileOriginAndSizeTypedSettingsNames: 'getTileOriginAndSize',
	UnitTypedSettingsNames: 'tileSize',
}>

// Export

export {
	TileSettings,
	TileSettingsFunctions,
	DEFAULT_TILE_SETTINGS,
	TileSettingsName,
	tileSettingsNamesToPathsMap,
	TileSettingsNamesByType,
}
