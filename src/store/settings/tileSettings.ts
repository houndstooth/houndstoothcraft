// tslint:disable:no-magic-numbers no-any

import { getStandardTileOriginAndSize, GetTileOriginAndSize, Unit } from '../../components'
import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'

interface TileSettings {
	readonly collapseSameColoredShapesWithinTile: boolean,
	readonly getTileOriginAndSize: GetTileOriginAndSize,
	readonly tileSize: Unit,
	readonly [_: string]: any,
}

type TileSettingsStructure = { readonly [P in keyof TileSettings]: any }

type TileSettingsFunctions = FunctionsOf<TileSettings>

const DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE = true
const DEFAULT_GET_TILE_ORIGIN_AND_SIZE: GetTileOriginAndSize = getStandardTileOriginAndSize
const DEFAULT_TILE_SIZE: Unit = to.Unit(50)

const DEFAULT_TILE_SETTINGS: TileSettings = {
	collapseSameColoredShapesWithinTile: DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE,
	getTileOriginAndSize: DEFAULT_GET_TILE_ORIGIN_AND_SIZE,
	tileSize: DEFAULT_TILE_SIZE,
}

type TileSettingsName = 'tileSettings'

const tileSettingsNamesToPathsMap: TileSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'tileSettings' ]),
	settings: DEFAULT_TILE_SETTINGS,
})

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
	tileSettingsNamesToPathsMap,
	TileSettingsNamesByType,
}
