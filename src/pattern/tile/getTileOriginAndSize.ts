import { getSetting } from '../../app'
import { Address } from '../grid'
import { TileOriginAndSize } from './types'

const getTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize | undefined =
	({ gridAddress }: { gridAddress: Address }): TileOriginAndSize | undefined =>
		getSetting.default('getTileOriginAndSize')({ gridAddress })

export default getTileOriginAndSize
