import { to } from '../../../../src'
import * as mathUtilities from '../../../../src/utilities/mathUtilities'

describe('math utilities', () => {
	describe('#isOdd', () => {
		let isOdd
		beforeEach(() => isOdd = mathUtilities.isOdd)

		it('is false when the number is divisible by 2 with a remainder of 0, -0, or -1', () => {
			expect(isOdd(0)).toBe(false)
			expect(isOdd(2)).toBe(false)
			expect(isOdd(4)).toBe(false)
			expect(isOdd(-2)).toBe(false)
			expect(isOdd(-1)).toBe(false)
		})

		it('is true when dividing the number by 2 results in a remainder of 1', () => {
			expect(isOdd(1)).toBe(true)
			expect(isOdd(3)).toBe(true)
			expect(isOdd(5)).toBe(true)
		})
	})

	describe('#triangularNumber', () => {
		let triangularNumber
		beforeEach(() => triangularNumber = mathUtilities.triangularNumber)

		it('returns the triangular number for n', () => {
			expect(triangularNumber(0)).toBe(0)
			expect(triangularNumber(1)).toBe(1)
			expect(triangularNumber(2)).toBe(3)
			expect(triangularNumber(3)).toBe(6)
			expect(triangularNumber(4)).toBe(10)
			expect(triangularNumber(5)).toBe(15)
			expect(triangularNumber(6)).toBe(21)
		})

		it('returns numbers in-between triangular numbers', () => {
			expect(triangularNumber(0.5)).toBe((Math.pow(2, 2) - 1) / 8)
			expect(triangularNumber(1.5)).toBe((Math.pow(4, 2) - 1) / 8)
			expect(triangularNumber(2.5)).toBe((Math.pow(6, 2) - 1) / 8)
		})

		it('is the inverse of triangular root', () => {
			expect(triangularNumber(mathUtilities.triangularRoot(5))).toBe(5)
		})
	})

	describe('#triangularRoot', () => {
		let triangularRoot
		beforeEach(() => triangularRoot = mathUtilities.triangularRoot)

		it('given a triangular number, returns its n', () => {
			expect(triangularRoot(0)).toBe(0)
			expect(triangularRoot(1)).toBe(1)
			expect(triangularRoot(3)).toBe(2)
			expect(triangularRoot(6)).toBe(3)
			expect(triangularRoot(10)).toBe(4)
			expect(triangularRoot(15)).toBe(5)
			expect(triangularRoot(21)).toBe(6)
		})

		it('returns numbers in-between triangular roots', () => {
			expect(triangularRoot(0.5)).toBe(0.6180339887498949)
			expect(triangularRoot(2)).toBe(1.5615528128088303)
			expect(triangularRoot(4.5)).toBe(2.5413812651491097)
		})

		it('is the inverse of triangular number', () => {
			expect(triangularRoot(mathUtilities.triangularNumber(5))).toBe(5)
		})
	})

	describe('#quarterSquareNumber', () => {
		// tslint:disable-next-line:max-line-length
		it('gives the nth entry in the sequence of numbers where you add 1 to the amount you increase by each step every other step', () => {
			const quarterSquareNumber = mathUtilities.quarterSquareNumber
			let delta = 0
			let memo = 0
			expect(quarterSquareNumber(0)).toBe(memo) // 0

			memo += delta
			expect(quarterSquareNumber(1)).toBe(memo) // 0
			delta += 1
			memo += delta
			expect(quarterSquareNumber(2)).toBe(memo) // 1

			memo += delta
			expect(quarterSquareNumber(3)).toBe(memo) // 2
			delta += 1
			memo += delta
			expect(quarterSquareNumber(4)).toBe(memo) // 4

			memo += delta
			expect(quarterSquareNumber(5)).toBe(memo) // 6
			delta += 1
			memo += delta
			expect(quarterSquareNumber(6)).toBe(memo) // 9

			memo += delta
			expect(quarterSquareNumber(7)).toBe(memo) // 12
			delta += 1
			memo += delta
			expect(quarterSquareNumber(8)).toBe(memo) // 16
		})
	})

	describe('#trapezoidalNumber', () => {
		it('gives the difference between two triangular numbers', () => {
			const trapezoidalNumber = mathUtilities.trapezoidalNumber

			expect(trapezoidalNumber({ start: 0, height: 0 })).toBe(0)
			expect(trapezoidalNumber({ start: 0, height: 1 })).toBe(1)
			expect(trapezoidalNumber({ start: 0, height: 2 })).toBe(3)
			expect(trapezoidalNumber({ start: 0, height: 3 })).toBe(6)
			expect(trapezoidalNumber({ start: 0, height: 4 })).toBe(10)

			expect(trapezoidalNumber({ start: 1, height: 0 })).toBe(0)
			expect(trapezoidalNumber({ start: 1, height: 1 })).toBe(2)
			expect(trapezoidalNumber({ start: 1, height: 2 })).toBe(5)
			expect(trapezoidalNumber({ start: 1, height: 3 })).toBe(9)
			expect(trapezoidalNumber({ start: 1, height: 4 })).toBe(14)

			expect(trapezoidalNumber({ start: 2, height: 0 })).toBe(0)
			expect(trapezoidalNumber({ start: 2, height: 1 })).toBe(3)
			expect(trapezoidalNumber({ start: 2, height: 2 })).toBe(7)
			expect(trapezoidalNumber({ start: 2, height: 3 })).toBe(12)
			expect(trapezoidalNumber({ start: 2, height: 4 })).toBe(18)

			expect(trapezoidalNumber({ start: 3, height: 0 })).toBe(0)
			expect(trapezoidalNumber({ start: 3, height: 1 })).toBe(4)
			expect(trapezoidalNumber({ start: 3, height: 2 })).toBe(9)
			expect(trapezoidalNumber({ start: 3, height: 3 })).toBe(15)
			expect(trapezoidalNumber({ start: 3, height: 4 })).toBe(22)

			expect(trapezoidalNumber({ start: 4, height: 0 })).toBe(0)
			expect(trapezoidalNumber({ start: 4, height: 1 })).toBe(5)
			expect(trapezoidalNumber({ start: 4, height: 2 })).toBe(11)
			expect(trapezoidalNumber({ start: 4, height: 3 })).toBe(18)
			expect(trapezoidalNumber({ start: 4, height: 4 })).toBe(26)
		})
	})

	describe('#termialRoot', () => {
		// tslint:disable-next-line:max-line-length
		it('for a concrete example of what you can use this method for: given an starting stripe count per tile, the increase in stripe count per next tile, and a stripe number, it will return which tile that stripe passes through, including the fractional part within that tile', () => {
			const termialRoot = mathUtilities.termialRoot
			let rangeStart
			let rangeDelta

			rangeStart = 1
			rangeDelta = 1
			expect(termialRoot({ rangeStart, rangeDelta, n: 0 })).toBe(0)
			expect(termialRoot({ rangeStart, rangeDelta, n: 1 })).toBe(1)
			expect(termialRoot({ rangeStart, rangeDelta, n: 3 })).toBe(2)
			expect(termialRoot({ rangeStart, rangeDelta, n: 6 })).toBe(3)
			expect(termialRoot({ rangeStart, rangeDelta, n: 10 })).toBe(4)

			rangeStart = 2
			rangeDelta = 1
			expect(termialRoot({ rangeStart, rangeDelta, n: 0 })).toBe(0)
			expect(termialRoot({ rangeStart, rangeDelta, n: 2 })).toBe(1)
			expect(termialRoot({ rangeStart, rangeDelta, n: 5 })).toBe(2)
			expect(termialRoot({ rangeStart, rangeDelta, n: 9 })).toBe(3)
			expect(termialRoot({ rangeStart, rangeDelta, n: 14 })).toBe(4)

			rangeStart = 1
			rangeDelta = 2
			expect(termialRoot({ rangeStart, rangeDelta, n: 0 })).toBe(0)
			expect(termialRoot({ rangeStart, rangeDelta, n: 1 })).toBe(1)
			expect(termialRoot({ rangeStart, rangeDelta, n: 4 })).toBe(2)
			expect(termialRoot({ rangeStart, rangeDelta, n: 9 })).toBe(3)
			expect(termialRoot({ rangeStart, rangeDelta, n: 16 })).toBe(4)

			rangeStart = 2
			rangeDelta = 2
			expect(termialRoot({ rangeStart, rangeDelta, n: 0 })).toBe(0)
			expect(termialRoot({ rangeStart, rangeDelta, n: 2 })).toBe(1)
			expect(termialRoot({ rangeStart, rangeDelta, n: 6 })).toBe(2)
			expect(termialRoot({ rangeStart, rangeDelta, n: 12 })).toBe(3)
			expect(termialRoot({ rangeStart, rangeDelta, n: 20 })).toBe(4)
		})
	})

	describe('#rotate', () => {
		it('rotates a point about a fixed point', () => {
			const point = [ 2, 0 ]
			const fixedPoint = [ 1, 1 ]
			const rotation = to.Radian(Math.PI / 2)

			const rotatedPoint = mathUtilities.rotate({ point, fixedPoint, rotation })

			const expectedPoint = [ 2, 2 ]
			expect(rotatedPoint).toEqual(expectedPoint)
		})
	})
})
