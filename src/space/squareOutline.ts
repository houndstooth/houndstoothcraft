import { GetOutline, Coordinate } from './types'

const squareOutline: GetOutline = ({ tileOrigin, tileSize }) => {
	const tileSizeNumber = tileSize as number
	const x = tileOrigin[ 0 ]
	const y = tileOrigin[ 1 ]

	return [
		[
			x,
			y,
		] as Coordinate,
		[
			x + tileSizeNumber,
			y,
		] as Coordinate,
		[
			x + tileSizeNumber,
			y + tileSizeNumber,
		] as Coordinate,
		[
			x,
			y + tileSizeNumber,
		] as Coordinate,
	]
}

export default squareOutline
