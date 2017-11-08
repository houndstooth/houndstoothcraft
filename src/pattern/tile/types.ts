import { TransformShapeColorIndicesParams } from '../color'
import { Address, Unit } from '../grid'
import { Coordinate } from '../stripe'

interface DefinedTileParams extends TileOriginAndSize {
	readonly gridAddress: Address,
}

type Tile = (_: TileParams) => void

interface TileOriginAndSize {
	readonly tileOrigin: Coordinate,
	readonly tileSize: Unit,
}

interface TileParams extends TransformShapeColorIndicesParams, TileOriginAndSize {
}

// tslint:disable-next-line:no-any
type GetTileOriginAndSize = (p?: any) => TileOriginAndSize | undefined

export {
	GetTileOriginAndSize,
	TileParams,
	TileOriginAndSize,
	Tile,
	DefinedTileParams,
}
