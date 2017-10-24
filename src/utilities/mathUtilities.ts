// tslint:disable:no-magic-numbers

import { Radian } from '../space'
import * as from from '../utilities/from'

const isOdd: (n: number) => boolean = n => n % 2 === 1

const triangularNumber: (n: number) => number = n => n * (n + 1) / 2

const triangularRoot: (n: number) => number = n => Math.sqrt(n * 8 + 1) * 0.5 - 0.5

const quarterSquareNumber: (n: number) => number = n => Math.floor(Math.pow(n, 2) / 4)

const trapezoidalNumber: (_: { height: number, start: number }) => number = ({ height, start }) =>
	triangularNumber(start + height) - triangularNumber(start)

const termialRoot: (_: {
	n: number, rangeDelta: number, rangeStart: number,
}) => number = ({ n, rangeDelta, rangeStart }) => {
	const c = rangeStart * 2
	const a = Math.pow(c - rangeDelta, 2)
	const b = rangeDelta * n * 8
	const d = rangeDelta * 2

	return (Math.sqrt(a + b) - c + rangeDelta) / d
}

const rotate: (_: {
	fixedPoint: number[], point: number[], rotation: Radian
}) => number[] = ({ fixedPoint, point, rotation }) => {
	const sin = Math.sin(from.Radian(rotation))
	const cos = Math.cos(from.Radian(rotation))

	const pointX = fixedPoint[ 0 ]
	const pointY = fixedPoint[ 1 ]

	const relativeX = point[ 0 ] - pointX
	const relativeY = point[ 1 ] - pointY

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
