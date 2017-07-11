import execute from '../../src/application/execute'
import setup from '../../src/application/setup'
import tileSectorCenterIsColor from '../helpers/tileSectorCenterIsColor'
import { BLACK, TRANSPARENT } from '../../src/constants'
import { TILE_SIZE } from '../../src/defaults'

describe('standard houndstooth pattern', () => {
	it('repeats a 2x2 pattern of a solid black, solid white, and two b&w diagonally striped tiles, the striped tiles having four stripes each, and their diagonal stripes being the minor diagonal', () => {
		let originInPixels
		const tileSizeInPixels = TILE_SIZE

		setup({ effects: [] })

		execute()

		// first supertile

		originInPixels = [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: BLACK })).toBe(true)

		originInPixels = [ 0 * tileSizeInPixels, 1 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: BLACK })).toBe(true)

		originInPixels = [ 1 * tileSizeInPixels, 0 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		originInPixels = [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		// second supertile

		originInPixels = [ 2 * tileSizeInPixels, 0 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: BLACK })).toBe(true)

		originInPixels = [ 2 * tileSizeInPixels, 1 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: BLACK })).toBe(true)

		originInPixels = [ 3 * tileSizeInPixels, 0 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		originInPixels = [ 3 * tileSizeInPixels, 1 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		// third supertile

		originInPixels = [ 0 * tileSizeInPixels, 2 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: BLACK })).toBe(true)

		originInPixels = [ 0 * tileSizeInPixels, 3 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: BLACK })).toBe(true)

		originInPixels = [ 1 * tileSizeInPixels, 2 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		originInPixels = [ 1 * tileSizeInPixels, 3 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		// fourth supertile

		originInPixels = [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: BLACK })).toBe(true)

		originInPixels = [ 2 * tileSizeInPixels, 3 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: BLACK })).toBe(true)

		originInPixels = [ 3 * tileSizeInPixels, 2 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		originInPixels = [ 3 * tileSizeInPixels, 3 * tileSizeInPixels ]
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: TRANSPARENT })).toBe(true)
	})
})
