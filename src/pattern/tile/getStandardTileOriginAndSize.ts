import { getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import * as from from '../../from'
import * as to from '../../to'
import { Address, Unit } from '../grid'
import { TileOriginAndSize } from './types'

const getStandardTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize =
	({ gridAddress }: { gridAddress: Address }): TileOriginAndSize => {
		const tileSize: Unit = getFromBaseOrDefaultPattern('tileSize')
		const [ x, y ]: number[] = from.Address(gridAddress)

		return {
			tileOrigin: to.Coordinate([ x * from.Unit(tileSize), y * from.Unit(tileSize) ]),
			tileSize,
		}
	}

export { getStandardTileOriginAndSize }
