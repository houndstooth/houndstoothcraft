import { TileOriginAndSize } from '../components'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { GetOutline, Outline } from './types'

const squareOutline: GetOutline =
	({ tileOrigin, tileSize }: TileOriginAndSize): Outline => {
		const x: number = from.Unit(tileOrigin[ 0 ])
		const y: number = from.Unit(tileOrigin[ 1 ])

		return to.Outline([
			[
				x,
				y,
			],
			[
				x + from.Unit(tileSize),
				y,
			],
			[
				x + from.Unit(tileSize),
				y + from.Unit(tileSize),
			],
			[
				x,
				y + from.Unit(tileSize),
			],
		])
	}

export { squareOutline }
