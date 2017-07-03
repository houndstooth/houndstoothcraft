import execute from '../../src/application/execute'
import ctx from '../../src/render/ctx'
import { TILE_SIZE } from '../../src/defaults'

describe('Standard Houndstooth', () => {
	it('repeats a 2x2 pattern of a solid black, solid white, and two b&w striped tiles, the striped tiles having four stripes each', () => {
		let address

		execute()

		const TRANSPARENT = { r: 0, g: 0, b: 0, a: 0 }
		const BLACK = { r: 0, g: 0, b: 0, a: 1 }

		// first supertile

		address = [ 0, 0 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), BLACK)

		address = [ 0, 1 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), BLACK)

		address = [ 1, 0 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), TRANSPARENT)

		address = [ 1, 1 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), TRANSPARENT)

		// second supertile

		address = [ 2, 0 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), BLACK)

		address = [ 2, 1 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), BLACK)

		address = [ 3, 0 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), TRANSPARENT)

		address = [ 3, 1 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), TRANSPARENT)

		// third supertile

		address = [ 0, 2 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), BLACK)

		address = [ 0, 3 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), BLACK)

		address = [ 1, 2 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), TRANSPARENT)

		address = [ 1, 3 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), TRANSPARENT)

		// fourth supertile

		address = [ 2, 2 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), BLACK)

		address = [ 2, 3 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), BLACK)

		address = [ 3, 2 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), TRANSPARENT)

		address = [ 3, 3 ]
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 0, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 0, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 1, n: 4 })), TRANSPARENT)
		expectToBeColor(pixel(sectorCenter({ address, x: 0, y: 2, n: 4 })), TRANSPARENT)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 1, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 2, y: 2, n: 4 })), BLACK)
		expectToBeColor(pixel(sectorCenter({ address, x: 1, y: 3, n: 4 })), BLACK)

		expectToBeColor(pixel(sectorCenter({ address, x: 3, y: 3, n: 4 })), TRANSPARENT)
	})
})

const pixel = ([ x, y ]) => {
	const pixelData = ctx.getImageData(x, y, 1, 1).data
	return {
		r: pixelData[ 0 ],
		g: pixelData[ 1 ],
		b: pixelData[ 2 ],
		a: pixelData[ 3 ] / 255,
	}
}

const sectorCenter = ({ address, x, y, n }) => {
	const sectorSize = TILE_SIZE / n
	return [
		address[ 0 ] * TILE_SIZE + (x + 0.5) * sectorSize,
		address[ 1 ] * TILE_SIZE + (y + 0.5) * sectorSize,
	]
}

const expectToBeColor = (colorOne, colorTwo) => {
	return Object.entries(colorOne).forEach(([ key, value ]) => {
		expect(value).toBeCloseTo(colorTwo[ key ], 5)
	})
}
