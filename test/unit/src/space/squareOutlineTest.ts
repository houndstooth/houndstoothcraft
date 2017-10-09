import squareOutline from '../../../../src/space/squareOutline'

describe('square outline', () => {
	const tileOrigin = [ 2, 3 ]
	const tileSize = 5

	it('makes a square in the correct place of the correct size', () => {
		expect(squareOutline({ tileOrigin, tileSize })).toEqual([
			[ 2, 3 ],
			[ 7, 3 ],
			[ 7, 8 ],
			[ 2, 8 ],
		])
	})
})