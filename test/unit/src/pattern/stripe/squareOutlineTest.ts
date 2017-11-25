import { Coordinate, squareOutline, to, Unit } from '../../../../../src'

describe('square outline', () => {
	const tileOrigin: Coordinate = to.Coordinate([ 2, 3 ])
	const tileSize: Unit = to.Unit(5)

	it('makes a square in the correct place of the correct size', () => {
		expect(squareOutline.main({ tileOrigin, tileSize })).toEqual(to.Outline([
			[ 2, 3 ],
			[ 7, 3 ],
			[ 7, 8 ],
			[ 2, 8 ],
		]))
	})
})
