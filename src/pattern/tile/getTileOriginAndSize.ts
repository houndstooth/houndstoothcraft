import { getFromBaseOrDefaultPattern } from '../../app'
import { Address } from '../grid'
import { TileOriginAndSize } from './types'

const getTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize | undefined =
	({ gridAddress }: { gridAddress: Address }): TileOriginAndSize | undefined =>
		getFromBaseOrDefaultPattern.main('getTileOriginAndSize')({ gridAddress })

export { getTileOriginAndSize as main }
