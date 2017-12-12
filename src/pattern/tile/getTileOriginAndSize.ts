import { Address } from '../grid'
import { patternState } from '../patternState'
import { TileOriginAndSize } from './types'

const getTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize | undefined =
	({ gridAddress }: { gridAddress: Address }): TileOriginAndSize | undefined =>
		patternState.tileSettings.getTileOriginAndSize({ gridAddress })

export default getTileOriginAndSize
