import * as from from '../from'
import * as to from '../to'
import { GetOutline } from './types'

const squareOutline: GetOutline = ({ tileOrigin, tileSize }) => {
	const x = from.Unit(tileOrigin[ 0 ])
	const y = from.Unit(tileOrigin[ 1 ])

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
