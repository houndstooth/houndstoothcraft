import rotationUtilities from '../../../src/utilities/rotationUtilities'
import coordinatesMatch from '../helpers/coordinatesMatch'

describe('rotation utilities', () => {
	describe('#rotateCoordinatesAboutPoint', () => {
		it('now this needs a test', () => {
			const rotateCoordinatesAboutPoint = rotationUtilities.rotateCoordinatesAboutPoint
			const coordinates = [
				[ 0, 0 ],
				[ 2, 0 ],
				[ 0, 2 ],
			]
			const point = [ 1, 1 ]
			const rotation = Math.PI / 2

			const actualCoordinates = rotateCoordinatesAboutPoint(
				{ coordinates, point, rotation }
			)

			const expectedCoordinates = [
				[ 2, 0 ],
				[ 2, 2 ],
				[ 0, 0 ],
			]
			expect(coordinatesMatch(expectedCoordinates, actualCoordinates)).toBe(true)
		})
	})
})
