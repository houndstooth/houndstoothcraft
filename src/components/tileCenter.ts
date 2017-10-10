const tileCenter: { ({}: { tileOrigin: number[], tileSize: number }): number[] } = ({ tileOrigin, tileSize }) => [
	tileOrigin[ 0 ] + tileSize / 2,
	tileOrigin[ 1 ] + tileSize / 2,
]

export default tileCenter
