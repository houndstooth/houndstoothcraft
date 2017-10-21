import { getSetting } from '../store'
import { Address, TileOriginAndSize } from './types'

const getTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize | undefined = ({ gridAddress }) =>
	getSetting('getTileOriginAndSize')({ gridAddress })

export { getTileOriginAndSize }
