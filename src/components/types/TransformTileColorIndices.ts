import { Address } from './Address'
import { TileColorIndices } from './TileColorIndices'

type TransformTileColorIndices = (_: { gridAddress: Address, tileColorIndices: TileColorIndices }) => TileColorIndices

export { TransformTileColorIndices }
