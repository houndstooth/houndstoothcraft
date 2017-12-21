// tslint:disable:no-type-definitions-outside-types-modules

import { Bool, False, FunctionsOf, Rec, True } from '../types'
import { GetTileOriginAndSize, Unit } from './types'

type TileSettingsSchema<R extends Bool> =
	Rec<'collapseSameColoredShapesWithinTile', boolean, R> &
	Rec<'getTileOriginAndSize', GetTileOriginAndSize, R> &
	Rec<'tileSize', Unit, R>

interface TileSettings extends TileSettingsSchema<True>{}

type TileSettingFunctions = FunctionsOf<TileSettingsSchema<False>>

export {
	TileSettings,
	TileSettingsSchema,
	TileSettingFunctions,
}
