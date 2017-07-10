import execute from '../../src/application/execute'
import setup from '../../src/application/setup'
import expectSectorOfTileToBeColor from '../helpers/expectSectorOfTileToBeColor'
import { BLACK, TRANSPARENT } from '../../src/constants'
import { TILE_SIZE } from '../../src/defaults'

describe('standard houndstooth pattern', () => {
	it('repeats a 2x2 pattern of a solid black, solid white, and two b&w diagonally striped tiles, the striped tiles having four stripes each, and their diagonal stripes being the minor diagonal', () => {
		let address
		const tileSize = TILE_SIZE

		setup({ effects: [] })

		execute()

		// first supertile

		address = [ 0, 0 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: BLACK })

		address = [ 0, 1 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: BLACK })

		address = [ 1, 0 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: TRANSPARENT })

		address = [ 1, 1 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: TRANSPARENT })

		// second supertile

		address = [ 2, 0 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: BLACK })

		address = [ 2, 1 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: BLACK })

		address = [ 3, 0 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: TRANSPARENT })

		address = [ 3, 1 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: TRANSPARENT })

		// third supertile

		address = [ 0, 2 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: BLACK })

		address = [ 0, 3 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: BLACK })

		address = [ 1, 2 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: TRANSPARENT })

		address = [ 1, 3 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: TRANSPARENT })

		// fourth supertile

		address = [ 2, 2 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: BLACK })

		address = [ 2, 3 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: BLACK })

		address = [ 3, 2 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: TRANSPARENT })

		address = [ 3, 3 ]
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 0, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 0, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 1, n: 4, color: TRANSPARENT })
		expectSectorOfTileToBeColor({ address, tileSize, x: 0, y: 2, n: 4, color: TRANSPARENT })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 1, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 2, y: 2, n: 4, color: BLACK })
		expectSectorOfTileToBeColor({ address, tileSize, x: 1, y: 3, n: 4, color: BLACK })

		expectSectorOfTileToBeColor({ address, tileSize, x: 3, y: 3, n: 4, color: TRANSPARENT })
	})
})
