import { from, to } from '../../utilities'
import { Address } from '../grid'
import { patternState } from '../patternState'
import { TileOriginAndSize, Unit } from './types'

const getStandardTileOriginAndSize: (_: { address: Address }) => TileOriginAndSize =
	({ address }: { address: Address }): TileOriginAndSize => {
		const tileSize: Unit = patternState.tileSettings.tileSize
		const [ x, y ]: number[] = from.Address(address)

		return {
			tileOrigin: to.Coordinate([ x * from.Unit(tileSize), y * from.Unit(tileSize) ]),
			tileSize,
		}
	}

export default getStandardTileOriginAndSize
