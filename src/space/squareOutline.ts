import { GetOutline, Coordinate } from './types'

const squareOutline: GetOutline = ({ tileOrigin, tileSize }) => {
	const x = tileOrigin[ 0 ]
	const y = tileOrigin[ 1 ]

	return [
		[
			x,
			y,
		] as Coordinate,
		[
			x + tileSize,
			y,
		] as Coordinate,
		[
			x + tileSize,
			y + tileSize,
		] as Coordinate,
		[
			x,
			y + tileSize,
		] as Coordinate,
	]
}

export default squareOutline
