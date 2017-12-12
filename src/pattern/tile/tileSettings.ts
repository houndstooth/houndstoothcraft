// tslint:disable:no-magic-numbers no-any

import { Unit } from '../grid'
import { Bool, False, FunctionsOf, Rec, True } from '../types'
import { GetTileOriginAndSize } from './types'

type TileSettingsSchema<R extends Bool> =
	Rec<'collapseSameColoredShapesWithinTile', boolean, R> &
	Rec<'getTileOriginAndSize', GetTileOriginAndSize, R> &
	Rec<'tileSize', Unit, R>

interface TileSettings extends TileSettingsSchema<True>{}

type TileSettingsFunctions = FunctionsOf<TileSettingsSchema<False>>

export {
	TileSettings,
	TileSettingsSchema,
	TileSettingsFunctions,
}
