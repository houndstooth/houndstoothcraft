// tslint:disable:no-magic-numbers

import * as from from '../from'
import { Radian } from '../pattern'

const isOdd: (n: number) => boolean =
	(n: number): boolean => n % 2 === 1

const triangularNumber: (n: number) => number =
	(n: number): number => n * (n + 1) / 2

const triangularRoot: (n: number) => number =
	(n: number): number => Math.sqrt(n * 8 + 1) * 0.5 - 0.5

const quarterSquareNumber: (n: number) => number =
	(n: number): number => Math.floor(Math.pow(n, 2) / 4)

const trapezoidalNumber: (_: { height: number, start: number }) => number =
	({ height, start }: { height: number, start: number }): number =>
		triangularNumber(start + height) - triangularNumber(start)

const termialRoot: (_: { n: number, rangeDelta: number, rangeStart: number }) => number =
	({ n, rangeDelta, rangeStart }: { n: number, rangeDelta: number, rangeStart: number }): number => {
		const c: number = rangeStart * 2
		const a: number = Math.pow(c - rangeDelta, 2)
		const b: number = rangeDelta * n * 8
		const d: number = rangeDelta * 2

		return (Math.sqrt(a + b) - c + rangeDelta) / d
	}

const rotate: (_: { fixedPoint: number[], point: number[], rotation: Radian }) => number[] =
	({ fixedPoint, point, rotation }: { fixedPoint: number[], point: number[], rotation: Radian }): number[] => {
		const sin: number = Math.sin(from.Radian(rotation))
		const cos: number = Math.cos(from.Radian(rotation))

		const pointX: number = fixedPoint[ 0 ]
		const pointY: number = fixedPoint[ 1 ]

		const relativeX: number = point[ 0 ] - pointX
		const relativeY: number = point[ 1 ] - pointY

		return [
			pointX + relativeX * cos - relativeY * sin,
			pointY + relativeX * sin + relativeY * cos,
		]
	}

export {
	isOdd,
	trapezoidalNumber,
	triangularNumber,
	triangularRoot,
	quarterSquareNumber,
	termialRoot,
	rotate,
}
