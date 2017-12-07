import { Address } from '../grid'
import { get } from '../patternState'
import { TileOriginAndSize } from './types'

const getTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize | undefined =
	({ gridAddress }: { gridAddress: Address }): TileOriginAndSize | undefined =>
		get('getTileOriginAndSize')({ gridAddress })

export default getTileOriginAndSize
