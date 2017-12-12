// tslint:disable:no-magic-numbers no-any

import { Unit } from '../grid'
import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'
import { GetTileOriginAndSize } from './types'

interface TileSettings {
	readonly collapseSameColoredShapesWithinTile: boolean,
	readonly getTileOriginAndSize: GetTileOriginAndSize,
	readonly tileSize: Unit,
	readonly [_: string]: any,
}

type TileSettingsFunctions = FunctionsOf<TileSettings>

type TileSettingsName = 'tileSettings'

type TileSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'collapseSameColoredShapesWithinTile',
	GetTileOriginAndSizeTypedSettingsNames: 'getTileOriginAndSize',
	UnitTypedSettingsNames: 'tileSize',
}>

export {
	TileSettings,
	TileSettingsFunctions,
	TileSettingsName,
	TileSettingsNamesByType,
}
