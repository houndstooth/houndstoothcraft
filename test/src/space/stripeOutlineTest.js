import stripeOutline from '../../../src/space/stripeOutline'
import state from '../../../state'
import * as rotateCoordinateAboutPoint from '../../../src/space/rotateCoordinateAboutPoint'

describe('stripe outline', () => {
	const tileOrigin = [ 0, 0 ]
	const tileSize = 1
	let stripeStart, stripeEnd

	describe('a stripe that starts at the top left corner', () => {
		beforeEach(() => stripeStart = 0)

		describe('and ends within the top left half', () => {
			beforeEach(() => stripeEnd = 0.5)

			it('makes a triangle within the top left half', () => {
				const outlineOptions = { stripeStart, stripeEnd }
				const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })
				expect(result).toEqual([
					[ 0, 0 ],
					[ 0.5, 0 ],
					[ 0, 0.5 ],
				])
			})
		})

		describe('and ends on the halfway line', () => {
			beforeEach(() => stripeEnd = 1)

			it('makes a triangle out of the entire top left half', () => {
				const outlineOptions = { stripeStart, stripeEnd }
				const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })
				expect(result).toEqual([
					[ 0, 0 ],
					[ 1, 0 ],
					[ 0, 1 ],
				])
			})
		})

		describe('and ends within the bottom right half', () => {
			beforeEach(() => stripeEnd = 1.5)

			it('makes a square with a triangle subtracted from the bottom right half', () => {
				const outlineOptions = { stripeStart, stripeEnd }
				const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })
				expect(result).toEqual([
					[ 0, 0 ],
					[ 1, 0 ],
					[ 1, 0.5 ],
					[ 0.5, 1 ],
					[ 0, 1 ],
				])
			})
		})
	})

	describe('a stripe that starts within the top left half', () => {
		beforeEach(() => stripeStart = 0.5)

		describe('and also ends within the top left half', () => {
			beforeEach(() => stripeEnd = 0.75)

			it('makes a trapezoid within the top left half', () => {
				const outlineOptions = { stripeStart, stripeEnd }
				const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })
				expect(result).toEqual([
					[ 0.5, 0 ],
					[ 0.75, 0 ],
					[ 0, 0.75 ],
					[ 0, 0.5 ],
				])
			})
		})

		describe('and ends on the halfway line', () => {
			beforeEach(() => stripeEnd = 1)

			it('makes a trapezoid within the top left half, on the edge with the bottom right half', () => {
				const outlineOptions = { stripeStart, stripeEnd }
				const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })
				expect(result).toEqual([
					[ 0.5, 0 ],
					[ 1, 0 ],
					[ 0, 1 ],
					[ 0, 0.5 ],
				])
			})
		})

		describe('and ends within the bottom right half', () => {
			beforeEach(() => stripeEnd = 1.5)

			it('makes a hexagon with vertices in the bottom left and the top right corners, plus one on each of the square\'s edges', () => {
				const outlineOptions = { stripeStart, stripeEnd }
				const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })
				expect(result).toEqual([
					[ 0.5, 0 ],
					[ 1, 0 ],
					[ 1, 0.5 ],
					[ 0.5, 1 ],
					[ 0, 1 ],
					[ 0, 0.5 ],
				])
			})
		})

		describe('and ends at the bottom right corner', () => {
			beforeEach(() => stripeEnd = 2)

			it('makes a pentagon straddling with vertices at the bottom right, bottom left, and top right corners, as well as one on each of the left and top edges', () => {
				const outlineOptions = { stripeStart, stripeEnd }
				const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })
				expect(result).toEqual([
					[ 0.5, 0 ],
					[ 1, 0 ],
					[ 1, 1 ],
					[ 0, 1 ],
					[ 0, 0.5 ],
				])
			})
		})
	})

	describe('a stripe that starts on the halfway line', () => {
		beforeEach(() => stripeStart = 1)

		describe('and ends within the bottom right half', () => {
			beforeEach(() => stripeEnd = 1.5)

			it('makes a trapezoid within the bottom right half, at the edge of the top left half', () => {
				const outlineOptions = { stripeStart, stripeEnd }
				const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })
				expect(result).toEqual([
					[ 1, 0 ],
					[ 1, 0.5 ],
					[ 0.5, 1 ],
					[ 0, 1 ],
				])
			})
		})

		describe('and ends at the bottom right corner', () => {
			beforeEach(() => stripeEnd = 2)

			it('makes a triangle out of the entire bottom right half', () => {
				const outlineOptions = { stripeStart, stripeEnd }
				const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })
				expect(result).toEqual([
					[ 1, 0 ],
					[ 1, 1 ],
					[ 0, 1 ],
				])
			})
		})
	})

	describe('a stripe that starts within the bottom right half', () => {
		beforeEach(() => stripeStart = 1.5)

		describe('and also ends within the bottom right half', () => {
			beforeEach(() => stripeEnd = 1.75)

			it('makes a trapezoid within the bottom right half', () => {
				const outlineOptions = { stripeStart, stripeEnd }
				const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })
				expect(result).toEqual([
					[ 1, 0.5 ],
					[ 1, 0.75 ],
					[ 0.75, 1 ],
					[ 0.5, 1 ],
				])
			})
		})

		describe('and ends at the bottom right corner', () => {
			beforeEach(() => stripeEnd = 2)

			it('makes a triangle within the bottom right half', () => {
				const outlineOptions = { stripeStart, stripeEnd }
				const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })
				expect(result).toEqual([
					[ 1, 0.5 ],
					[ 1, 1 ],
					[ 0.5, 1 ],
				])
			})
		})
	})

	describe('when the base stripe diagonal is principal', () => {
		beforeEach(() => {
			state.mainHoundstooth.basePattern.stripeSettings = { baseStripeDiagonal: 'PRINCIPAL' }
		})

		it('rotates the stripe a quarter of the way around', () => {
			const rotatedCoordinate = [ 0, 0 ]
			spyOn(rotateCoordinateAboutPoint, 'default').and.returnValue(rotatedCoordinate)

			const outlineOptions = { stripeStart, stripeEnd }

			const result = stripeOutline({ tileOrigin, tileSize, outlineOptions })

			expect(rotateCoordinateAboutPoint.default).toHaveBeenCalled()
			expect(result[ 0 ]).toBe(rotatedCoordinate)
		})
	})
})
