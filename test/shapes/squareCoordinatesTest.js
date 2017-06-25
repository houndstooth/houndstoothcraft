import 'jasmine'

import squareCoordinates from '../../src/shapes/squareCoordinates'

const tileOrigin = [ 2, 3 ]
const sizedUnit = 5

import _resetStatesForTest from '../_resetStatesForTest'
beforeEach(() => _resetStatesForTest({ 
    state: typeof state === 'undefined' ? {} : state, 
    iterations: typeof iterations === 'undefined' ? {} : iterations, 
    animations: typeof animations === 'undefined' ? {} : animations, 
}))

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
