import 'jasmine'

import squareCoordinates from '../../shapes/squareCoordinates'

const tileOrigin = [ 2, 3 ]
const sizedUnit = 5

describe("square coordinates", () => {
	it('makes a square in the correct place of the correct size', () => {
		expect(squareCoordinates({ tileOrigin, sizedUnit })).toEqual([
			[ 2, 3 ],
			[ 7, 3 ],
			[ 7, 8 ],
			[ 2, 8 ]
		])
	})
})
