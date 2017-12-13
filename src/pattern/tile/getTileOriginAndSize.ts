import { Address } from '../grid'
import { patternState } from '../patternState'
import { TileOriginAndSize } from './types'

const getTileOriginAndSize: (_: { address: Address }) => TileOriginAndSize | undefined =
	({ address }: { address: Address }): TileOriginAndSize | undefined =>
		patternState.tileSettings.getTileOriginAndSize({ address })

export default getTileOriginAndSize
