import Outline from './Outline'

const squareOutline: Outline = ({ tileOrigin, tileSize }) => {
	const x = tileOrigin[ 0 ]
	const y = tileOrigin[ 1 ]

	return [
		[
			x,
			y,
		],
		[
			x + tileSize,
			y,
		],
		[
			x + tileSize,
			y + tileSize,
		],
		[
			x,
			y + tileSize,
		],
	]
}

export default squareOutline
