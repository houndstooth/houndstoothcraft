import { TileColorIndices } from './TileColorIndices'
import { Address } from './Address'

type TransformTileColorIndices = (_: {  gridAddress: Address, tileColorIndices: TileColorIndices }) => TileColorIndices

export { TransformTileColorIndices }
