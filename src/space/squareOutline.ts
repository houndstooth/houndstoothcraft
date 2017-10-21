import * as from from '../from'
import * as to from '../to'
import { GetOutline } from './types'

const squareOutline: GetOutline = ({ tileOrigin, tileSize }) => {
	const x = from.Units(tileOrigin[ 0 ])
	const y = from.Units(tileOrigin[ 1 ])

	return to.Outline([
		[
			x,
			y,
		],
		[
			x + from.Units(tileSize),
			y,
		],
		[
			x + from.Units(tileSize),
			y + from.Units(tileSize),
		],
		[
			x,
			y + from.Units(tileSize),
		],
	])
}

export { squareOutline }
