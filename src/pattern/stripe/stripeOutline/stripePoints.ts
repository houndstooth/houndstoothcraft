import * as from from '../../../from'
import * as to from '../../../to'
import { TileOriginAndSize } from '../../tile'
import { Coordinate } from '../types'
import { Point, PointParams, PointWithKnownPosition } from './types'

const pointAlongTopEdge: Point =
	({ stripePosition, tileOrigin: [ x, y ], tileSize }: PointParams): Coordinate => {
		const stripePositionValue: number = from.StripePosition(stripePosition)

		return to.Coordinate([
			stripePositionValue * from.Unit(tileSize) + from.Unit(x),
			from.Unit(y),
		])
	}

const pointAlongLeftEdge: Point =
	({ stripePosition, tileOrigin: [ x, y ], tileSize }: PointParams): Coordinate => {
		const stripePositionValue: number = from.StripePosition(stripePosition)

		return to.Coordinate([
			from.Unit(x),
			stripePositionValue * from.Unit(tileSize) + from.Unit(y),
		])
	}

const pointAlongRightEdge: Point =
	({ stripePosition, tileOrigin: [ x, y ], tileSize }: PointParams): Coordinate => {
		const stripePositionValue: number = from.StripePosition(stripePosition)

		return to.Coordinate([
			from.Unit(x) + from.Unit(tileSize),
			from.Unit(y) + (stripePositionValue - 1) * from.Unit(tileSize),
		])
	}

const pointAlongBottomEdge: Point =
	({ stripePosition, tileOrigin: [ x, y ], tileSize }: PointParams): Coordinate => {
		const stripePositionValue: number = from.StripePosition(stripePosition)

		return to.Coordinate([
			from.Unit(x) + (stripePositionValue - 1) * from.Unit(tileSize),
			from.Unit(y) + from.Unit(tileSize),
		])
	}

const pointInTopRightCorner: PointWithKnownPosition =
	({ tileOrigin: [ x, y ], tileSize }: TileOriginAndSize): Coordinate =>
		to.Coordinate([
			from.Unit(x) + from.Unit(tileSize),
			from.Unit(y),
		])

const pointInBottomRightCorner: PointWithKnownPosition =
	({ tileOrigin: [ x, y ], tileSize }: TileOriginAndSize): Coordinate =>
		to.Coordinate([
			from.Unit(x) + from.Unit(tileSize),
			from.Unit(y) + from.Unit(tileSize),
		])

const pointInBottomLeftCorner: PointWithKnownPosition =
	({ tileOrigin: [ x, y ], tileSize }: TileOriginAndSize): Coordinate =>
		to.Coordinate([
			from.Unit(x),
			from.Unit(y) + from.Unit(tileSize),
		])

export {
	pointAlongTopEdge,
	pointAlongLeftEdge,
	pointAlongRightEdge,
	pointAlongBottomEdge,
	pointInTopRightCorner,
	pointInBottomRightCorner,
	pointInBottomLeftCorner,
}
