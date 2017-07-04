import rotationUtilities from '../../../src/utilities/rotationUtilities'
import { QUARTER_OF_CIRCLE_ROTATION } from '../../../src/constants'
import { CANVAS_SIZE } from '../../../src/defaults'

describe('rotation utilities', () => {
	describe('#applyRotationToShape', () => {
		const coordinates = [
			[ 0, 0 ],
			[ 5, 0 ],
			[ 0, 5 ],
		]

		let applyRotationToShape
		beforeEach(() => applyRotationToShape = rotationUtilities.applyRotationToShape)

		describe('base stripe diagonal', () => {
			describe('when principal', () => {
				beforeEach(() => {
					settings.initial.baseStripeDiagonal = 'PRINCIPAL'
				})

				it('rotates the coordinates a quarter of the way around, about the shape\'s center', () => {
					const tileOrigin = [ 0, 0 ]
					const sizedUnit = 5

					const result = applyRotationToShape({ coordinates, tileOrigin, sizedUnit })

					const expectedCoordinates = [
						[ 5, 0 ],
						[ 5, 5 ],
						[ 0, 0 ],
					]
					result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
						expect(dimension).toBeCloseTo(expectedCoordinates[x][y])
					}))
				})

				it('handles the situation where the center of the shape is outside its coordinates', () => {
					const tileOrigin = [ 0, 0 ]
					const sizedUnit = 10

					const result = applyRotationToShape({ coordinates, tileOrigin, sizedUnit })

					const expectedCoordinates = [
						[ 10, 0 ],
						[ 10, 5 ],
						[ 5, 0 ],
					]
					result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
						expect(dimension).toBeCloseTo(expectedCoordinates[x][y])
					}))
				})

				it('handles the situation where the origin of the shape is outside its coordinates', () => {
					const tileOrigin = [ 5, 5 ]
					const sizedUnit = 5

					const result = applyRotationToShape({ coordinates, tileOrigin, sizedUnit })

					const expectedCoordinates = [
						[ 15, 0 ],
						[ 15, 5 ],
						[ 10, 0 ],
					]
					result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
						expect(dimension).toBeCloseTo(expectedCoordinates[x][y])
					}))
				})
			})

			it('defaults base stripe diagonal to minor, i.e. no rotation', () => {
				const coordinates = [
					[ 0, 0 ],
					[ 5, 0 ],
					[ 0, 5 ],
				]
				const tileOrigin = [ 0, 0 ]
				const sizedUnit = 5

				expect(applyRotationToShape({ coordinates, tileOrigin, sizedUnit })).toEqual(coordinates)
			})
		})

		describe('grid-respective rotation', () => {
			let tileOrigin, sizedUnit
			beforeEach(() => {
				tileOrigin = [ 0, 0 ]
				sizedUnit = 5
				settings.initial.gridConfig = { gridRotationAboutGridCenter: QUARTER_OF_CIRCLE_ROTATION }
			})

			it('can rotate coordinates about the grid center', () => {
				settings.initial.viewConfig = { canvasSize: 100 }

				const result = applyRotationToShape({ coordinates, tileOrigin, sizedUnit })

				const expectedCoordinates = [
					[ 100, 0 ],
					[ 100, 5 ],
					[ 95, 0 ],
				]
				result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
					expect(dimension).toBeCloseTo(expectedCoordinates[x][y])
				}))
			})

			it('defaults canvas size', () => {
				const result = applyRotationToShape({ coordinates, tileOrigin, sizedUnit })

				const expectedCoordinates = [
					[ CANVAS_SIZE, 0 ],
					[ CANVAS_SIZE, 5 ],
					[ CANVAS_SIZE - 5, 0 ],
				]
				result.forEach((coordinate, x) => coordinate.forEach((dimension, y) => {
					expect(dimension).toBeCloseTo(expectedCoordinates[x][y])
				}))
			})
		})
	})
})
