import { getFromBaseOrDefaultPattern } from '../store'
import { Address, TileOriginAndSize } from './types'

const getTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize | undefined =
	({ gridAddress }: { gridAddress: Address }): TileOriginAndSize | undefined =>
		getFromBaseOrDefaultPattern('getTileOriginAndSize')({ gridAddress })

export { getTileOriginAndSize }
