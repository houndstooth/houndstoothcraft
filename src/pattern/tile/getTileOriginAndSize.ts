// tslint:disable-next-line:no-reaching-imports
import { getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import { Address } from '../grid'
import { TileOriginAndSize } from './types'

const getTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize | undefined =
	({ gridAddress }: { gridAddress: Address }): TileOriginAndSize | undefined =>
		getFromBaseOrDefaultPattern('getTileOriginAndSize')({ gridAddress })

export { getTileOriginAndSize }
