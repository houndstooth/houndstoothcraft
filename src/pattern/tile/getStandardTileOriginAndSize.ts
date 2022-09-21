import { from, to } from '../../utilities'
import { AddressAsParam } from '../grid'
import { patternState } from '../patternState'

import { TileOriginAndSize, Unit } from './types'

const getStandardTileOriginAndSize: (_: AddressAsParam) => TileOriginAndSize =
	({ address }: AddressAsParam): TileOriginAndSize => {
		const tileSize: Unit = patternState.tileSettings.tileSize
		const [ x, y ]: number[] = from.Address(address)

		return {
			tileOrigin: to.Coordinate([ x * from.Unit(tileSize), y * from.Unit(tileSize) ]),
			tileSize,
		}
	}

export default getStandardTileOriginAndSize
