import { Coordinate, GetOutline, squareOutline, to, Unit } from '../../../../../src/indexForTest'

describe('square outline', () => {
	it('makes a square in the correct place of the correct size', () => {
		const subject: GetOutline = squareOutline.default
		const tileOrigin: Coordinate = to.Coordinate([ 2, 3 ])
		const tileSize: Unit = to.Unit(5)
		expect(subject({ tileOrigin, tileSize })).toEqual(to.Outline([
			[ 2, 3 ],
			[ 7, 3 ],
			[ 7, 8 ],
			[ 2, 8 ],
		]))
	})
})
