import rotateOutlineAboutPoint from '../../../src/outlines/rotateOutlineAboutPoint'
import coordinatesMatch from '../helpers/coordinatesMatch'

describe('rotate outline about point', () => {
	it('rotates an outline about a point', () => {
		const outline = [
			[ 0, 0 ],
			[ 2, 0 ],
			[ 0, 2 ],
		]
		const point = [ 1, 1 ]
		const rotation = Math.PI / 2

		const actualCoordinates = rotateOutlineAboutPoint({ outline, point, rotation })

		const expectedCoordinates = [
			[ 2, 0 ],
			[ 2, 2 ],
			[ 0, 0 ],
		]
		expect(coordinatesMatch(expectedCoordinates, actualCoordinates)).toBe(true)
	})
})
