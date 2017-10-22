import { Address } from './Address'
import { TileColorIndex } from './TileColorIndex'

type TransformTileColorIndices = (_: { gridAddress: Address, tileColorIndices: TileColorIndex[] }) => TileColorIndex[]

export { TransformTileColorIndices }
