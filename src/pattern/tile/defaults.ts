// tslint:disable:no-any no-magic-numbers

import { Unit } from '../grid'
import getStandardTileOriginAndSize from './getStandardTileOriginAndSize'
import { TileSettings } from './tileSettings'
import { GetTileOriginAndSize } from './types'

const DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE: boolean = true
const DEFAULT_GET_TILE_ORIGIN_AND_SIZE: GetTileOriginAndSize = getStandardTileOriginAndSize
const DEFAULT_TILE_SIZE: Unit = 50 as any

const DEFAULT_TILE_SETTINGS: TileSettings = {
	collapseSameColoredShapesWithinTile: DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE,
	getTileOriginAndSize: DEFAULT_GET_TILE_ORIGIN_AND_SIZE,
	tileSize: DEFAULT_TILE_SIZE,
}

export {
	DEFAULT_TILE_SETTINGS,
}
