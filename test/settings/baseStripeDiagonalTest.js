import execute from '../../src/application/execute'
import tileSectorCenterIsColor from '../helpers/tileSectorCenterIsColor'
import { BLACK, TRANSPARENT } from '../../src/constants'
import { TILE_SIZE } from '../../src/defaults'

describe('baseStripeDiagonal', () => {
	it('can be set to principal, to change the orientation of the stripes', () => {
		current.settings.initial.baseStripeDiagonal = 'PRINCIPAL'

		let originInPixels
		const tileSizeInPixels = TILE_SIZE

		execute()

		originInPixels = [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ]

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 3, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 2, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 0, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 2, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 0, n: 4, color: TRANSPARENT })).toBe(true)


		originInPixels = [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ]

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 3, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 0, y: 1, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 2, n: 4, color: BLACK })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 3, n: 4, color: BLACK })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 1, y: 0, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 2, y: 1, n: 4, color: TRANSPARENT })).toBe(true)
		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 2, n: 4, color: TRANSPARENT })).toBe(true)

		expect(tileSectorCenterIsColor({ originInPixels, tileSizeInPixels, x: 3, y: 0, n: 4, color: BLACK })).toBe(true)
	})
})
