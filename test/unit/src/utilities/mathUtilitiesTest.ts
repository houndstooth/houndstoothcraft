import { to } from '../../../../src'
import { Radian } from '../../../../src/space/types/Radian'
import * as mathUtilities from '../../../../src/utilities/mathUtilities'

describe('math utilities', () => {
	describe('#isOdd', () => {
		it('is false when the number is divisible by 2 with a remainder of 0, -0, or -1', () => {
			expect(mathUtilities.isOdd(0)).toBe(false)
			expect(mathUtilities.isOdd(2)).toBe(false)
			expect(mathUtilities.isOdd(4)).toBe(false)
			expect(mathUtilities.isOdd(-2)).toBe(false)
			expect(mathUtilities.isOdd(-1)).toBe(false)
		})

		it('is true when dividing the number by 2 results in a remainder of 1', () => {
			expect(mathUtilities.isOdd(1)).toBe(true)
			expect(mathUtilities.isOdd(3)).toBe(true)
			expect(mathUtilities.isOdd(5)).toBe(true)
		})
	})

	describe('#triangularNumber', () => {
		it('returns the triangular number for n', () => {
			expect(mathUtilities.triangularNumber(0)).toBe(0)
			expect(mathUtilities.triangularNumber(1)).toBe(1)
			expect(mathUtilities.triangularNumber(2)).toBe(3)
			expect(mathUtilities.triangularNumber(3)).toBe(6)
			expect(mathUtilities.triangularNumber(4)).toBe(10)
			expect(mathUtilities.triangularNumber(5)).toBe(15)
			expect(mathUtilities.triangularNumber(6)).toBe(21)
		})

		it('returns numbers in-between triangular numbers', () => {
			expect(mathUtilities.triangularNumber(0.5)).toBe((Math.pow(2, 2) - 1) / 8)
			expect(mathUtilities.triangularNumber(1.5)).toBe((Math.pow(4, 2) - 1) / 8)
			expect(mathUtilities.triangularNumber(2.5)).toBe((Math.pow(6, 2) - 1) / 8)
		})

		it('is the inverse of triangular root', () => {
			expect(mathUtilities.triangularNumber(mathUtilities.triangularRoot(5))).toBe(5)
		})
	})

	describe('#triangularRoot', () => {
		it('given a triangular number, returns its n', () => {
			expect(mathUtilities.triangularRoot(0)).toBe(0)
			expect(mathUtilities.triangularRoot(1)).toBe(1)
			expect(mathUtilities.triangularRoot(3)).toBe(2)
			expect(mathUtilities.triangularRoot(6)).toBe(3)
			expect(mathUtilities.triangularRoot(10)).toBe(4)
			expect(mathUtilities.triangularRoot(15)).toBe(5)
			expect(mathUtilities.triangularRoot(21)).toBe(6)
		})

		it('returns numbers in-between triangular roots', () => {
			expect(mathUtilities.triangularRoot(0.5)).toBe(0.6180339887498949)
			expect(mathUtilities.triangularRoot(2)).toBe(1.5615528128088303)
			expect(mathUtilities.triangularRoot(4.5)).toBe(2.5413812651491097)
		})

		it('is the inverse of triangular number', () => {
			expect(mathUtilities.triangularRoot(mathUtilities.triangularNumber(5))).toBe(5)
		})
	})

	describe('#quarterSquareNumber', () => {
		// tslint:disable-next-line:max-line-length
		it('gives the nth entry in the sequence of numbers where you add 1 to the amount you increase by each step every other step', () => {
			let delta: number = 0
			let memo: number = 0
			expect(mathUtilities.quarterSquareNumber(0)).toBe(memo) // 0

			memo += delta
			expect(mathUtilities.quarterSquareNumber(1)).toBe(memo) // 0
			delta += 1
			memo += delta
			expect(mathUtilities.quarterSquareNumber(2)).toBe(memo) // 1

			memo += delta
			expect(mathUtilities.quarterSquareNumber(3)).toBe(memo) // 2
			delta += 1
			memo += delta
			expect(mathUtilities.quarterSquareNumber(4)).toBe(memo) // 4

			memo += delta
			expect(mathUtilities.quarterSquareNumber(5)).toBe(memo) // 6
			delta += 1
			memo += delta
			expect(mathUtilities.quarterSquareNumber(6)).toBe(memo) // 9

			memo += delta
			expect(mathUtilities.quarterSquareNumber(7)).toBe(memo) // 12
			delta += 1
			memo += delta
			expect(mathUtilities.quarterSquareNumber(8)).toBe(memo) // 16
		})
	})

	describe('#trapezoidalNumber', () => {
		it('gives the difference between two triangular numbers', () => {
			expect(mathUtilities.trapezoidalNumber({ start: 0, height: 0 })).toBe(0)
			expect(mathUtilities.trapezoidalNumber({ start: 0, height: 1 })).toBe(1)
			expect(mathUtilities.trapezoidalNumber({ start: 0, height: 2 })).toBe(3)
			expect(mathUtilities.trapezoidalNumber({ start: 0, height: 3 })).toBe(6)
			expect(mathUtilities.trapezoidalNumber({ start: 0, height: 4 })).toBe(10)

			expect(mathUtilities.trapezoidalNumber({ start: 1, height: 0 })).toBe(0)
			expect(mathUtilities.trapezoidalNumber({ start: 1, height: 1 })).toBe(2)
			expect(mathUtilities.trapezoidalNumber({ start: 1, height: 2 })).toBe(5)
			expect(mathUtilities.trapezoidalNumber({ start: 1, height: 3 })).toBe(9)
			expect(mathUtilities.trapezoidalNumber({ start: 1, height: 4 })).toBe(14)

			expect(mathUtilities.trapezoidalNumber({ start: 2, height: 0 })).toBe(0)
			expect(mathUtilities.trapezoidalNumber({ start: 2, height: 1 })).toBe(3)
			expect(mathUtilities.trapezoidalNumber({ start: 2, height: 2 })).toBe(7)
			expect(mathUtilities.trapezoidalNumber({ start: 2, height: 3 })).toBe(12)
			expect(mathUtilities.trapezoidalNumber({ start: 2, height: 4 })).toBe(18)

			expect(mathUtilities.trapezoidalNumber({ start: 3, height: 0 })).toBe(0)
			expect(mathUtilities.trapezoidalNumber({ start: 3, height: 1 })).toBe(4)
			expect(mathUtilities.trapezoidalNumber({ start: 3, height: 2 })).toBe(9)
			expect(mathUtilities.trapezoidalNumber({ start: 3, height: 3 })).toBe(15)
			expect(mathUtilities.trapezoidalNumber({ start: 3, height: 4 })).toBe(22)

			expect(mathUtilities.trapezoidalNumber({ start: 4, height: 0 })).toBe(0)
			expect(mathUtilities.trapezoidalNumber({ start: 4, height: 1 })).toBe(5)
			expect(mathUtilities.trapezoidalNumber({ start: 4, height: 2 })).toBe(11)
			expect(mathUtilities.trapezoidalNumber({ start: 4, height: 3 })).toBe(18)
			expect(mathUtilities.trapezoidalNumber({ start: 4, height: 4 })).toBe(26)
		})
	})

	describe('#termialRoot', () => {
		// tslint:disable-next-line:max-line-length
		it('for a concrete example of what you can use this method for: given an starting stripe count per tile, the increase in stripe count per next tile, and a stripe number, it will return which tile that stripe passes through, including the fractional part within that tile', () => {
			let rangeStart: number
			let rangeDelta: number

			rangeStart = 1
			rangeDelta = 1
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 0 })).toBe(0)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 1 })).toBe(1)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 3 })).toBe(2)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 6 })).toBe(3)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 10 })).toBe(4)

			rangeStart = 2
			rangeDelta = 1
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 0 })).toBe(0)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 2 })).toBe(1)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 5 })).toBe(2)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 9 })).toBe(3)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 14 })).toBe(4)

			rangeStart = 1
			rangeDelta = 2
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 0 })).toBe(0)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 1 })).toBe(1)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 4 })).toBe(2)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 9 })).toBe(3)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 16 })).toBe(4)

			rangeStart = 2
			rangeDelta = 2
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 0 })).toBe(0)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 2 })).toBe(1)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 6 })).toBe(2)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 12 })).toBe(3)
			expect(mathUtilities.termialRoot({ rangeStart, rangeDelta, n: 20 })).toBe(4)
		})
	})

	describe('#rotate', () => {
		it('rotates a point about a fixed point', () => {
			const point: number[] = [ 2, 0 ]
			const fixedPoint: number[] = [ 1, 1 ]
			const rotation: Radian = to.Radian(Math.PI / 2)

			const rotatedPoint: number[] = mathUtilities.rotate({ point, fixedPoint, rotation })

			const expectedPoint: number[] = [ 2, 2 ]
			expect(rotatedPoint).toEqual(expectedPoint)
		})
	})
})
