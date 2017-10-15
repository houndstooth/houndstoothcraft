import { GetOutline, Coordinate } from './types'

const squareOutline: GetOutline = ({ tileOrigin, tileSize }) => {
	const tileSizeDowncast = tileSize as any
	const x = tileOrigin[ 0 ] as any
	const y = tileOrigin[ 1 ] as any

	return [
		[
			x,
			y,
		] as Coordinate,
		[
			x + tileSizeDowncast,
			y,
		] as Coordinate,
		[
			x + tileSizeDowncast,
			y + tileSizeDowncast,
		] as Coordinate,
		[
			x,
			y + tileSizeDowncast,
		] as Coordinate,
	]
}

export default squareOutline
