import { TransformShapeColorIndicesParams } from '../color'
import { AddressAsParam } from '../grid'

enum _CoordinateBrand {}
type Coordinate = _CoordinateBrand & Unit[]

interface DefinedTileParams extends TileOriginAndSize, AddressAsParam {
}

type GetTileOriginAndSize = (_: AddressAsParam) => TileOriginAndSize | undefined

type Outline = Coordinate[]

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
	Coordinate,
	DefinedTileParams,
	GetTileOriginAndSize,
	Outline,
	Tile,
	TileOriginAndSize,
	TileParams,
	Unit,
}
