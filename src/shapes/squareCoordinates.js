export default ({ tileOrigin, zoomedTileSize }) => {
	const x = tileOrigin[ 0 ]
	const y = tileOrigin[ 1 ]

	return [
		[
			x,
			y,
		],
		[
			x + zoomedTileSize,
			y,
		],
		[
			x + zoomedTileSize,
			y + zoomedTileSize,
		],
		[
			x,
			y + zoomedTileSize,
		],
	]
}
