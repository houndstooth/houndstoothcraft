import { TransformShapeColorIndicesParams } from '../color'
import { GridAddressParam } from '../grid'
import { Coordinate } from '../stripe'

interface DefinedTileParams extends TileOriginAndSize, GridAddressParam {
}

type GetTileOriginAndSize = (_: GridAddressParam) => TileOriginAndSize | undefined

type Tile = (_: TileParams) => void

interface TileOriginAndSize {
	tileOrigin: Coordinate,
	tileSize: Unit,
}

interface TileParams extends TransformShapeColorIndicesParams, TileOriginAndSize {
}

interface Unit extends Number {
	// tslint:disable-next-line:no-any
	_UnitsBrand: any,
}

export {
	DefinedTileParams,
	GetTileOriginAndSize,
	Tile,
	TileOriginAndSize,
	TileParams,
	Unit,
}
