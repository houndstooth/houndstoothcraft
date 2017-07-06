import execute from '../../src/application/execute'
import expectSectorOfTileToBeColor from '../helpers/expectSectorOfTileToBeColor'
import { BLACK, TRANSPARENT } from '../../src/constants'
import { TILE_SIZE } from '../../src/defaults'

describe('baseStripeDiagonal', () => {
	it('can be set to principal, to change the orientation of the stripes', () => {
		current.settings.initial.baseStripeDiagonal = 'PRINCIPAL'

		let address
		const tileSize = TILE_SIZE

		execute()


		address = [ 0, 0 ]

		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 3, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 2, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 3, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 0, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 2, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 0, n: 4, color: TRANSPARENT })


		address = [ 1, 1 ]

		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 3, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 2, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 3, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 0, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 2, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 0, n: 4, color: BLACK })
	})
})
