import expectSectorOfTileToBeColor from './expectSectorOfTileToBeColor'

export default ({ origin, tileSize, colors }) => {
	expectSectorOfTileToBeColor({ address: origin, tileSize, x: 0, y: 0, n: 4, color: colors[0] })

	expectSectorOfTileToBeColor({ address: origin, tileSize, x: 2, y: 0, n: 4, color: colors[1] })
	expectSectorOfTileToBeColor({ address: origin, tileSize, x: 1, y: 1, n: 4, color: colors[1] })
	expectSectorOfTileToBeColor({ address: origin, tileSize, x: 0, y: 2, n: 4, color: colors[1] })

	expectSectorOfTileToBeColor({ address: origin, tileSize, x: 3, y: 1, n: 4, color: colors[0] })
	expectSectorOfTileToBeColor({ address: origin, tileSize, x: 2, y: 2, n: 4, color: colors[0] })
	expectSectorOfTileToBeColor({ address: origin, tileSize, x: 1, y: 3, n: 4, color: colors[0] })

	expectSectorOfTileToBeColor({ address: origin, tileSize, x: 3, y: 3, n: 4, color: colors[1] })
}
