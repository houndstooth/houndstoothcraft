import * as from from '../../utilities/from'
import * as to from '../../utilities/to'
import { Point } from '../types'

const pointAlongTopEdge: Point = ({ stripePosition, tileOrigin: [ x, y ], tileSize }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		stripePositionValue * from.Unit(tileSize) + from.Unit(x),
		from.Unit(y),
	])
}

const pointAlongLeftEdge: Point = ({ stripePosition, tileOrigin: [ x, y ], tileSize }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		from.Unit(x),
		stripePositionValue * from.Unit(tileSize) + from.Unit(y),
	])
}

const pointAlongRightEdge: Point = ({ stripePosition, tileOrigin: [ x, y ], tileSize }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		from.Unit(x) + from.Unit(tileSize),
		from.Unit(y) + (stripePositionValue - 1) * from.Unit(tileSize),
	])
}

const pointAlongBottomEdge: Point = ({ stripePosition, tileOrigin: [ x, y ], tileSize }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		from.Unit(x) + (stripePositionValue - 1) * from.Unit(tileSize),
		from.Unit(y) + from.Unit(tileSize),
	])
}

const pointInTopRightCorner: Point = ({ tileOrigin: [ x, y ], tileSize }) =>
	to.Coordinate([
		from.Unit(x) + from.Unit(tileSize),
		from.Unit(y),
	])

const pointInBottomRightCorner: Point = ({ tileOrigin: [ x, y ], tileSize }) =>
	to.Coordinate([
		from.Unit(x) + from.Unit(tileSize),
		from.Unit(y) + from.Unit(tileSize),
	])

const pointInBottomLeftCorner: Point = ({ tileOrigin: [ x, y ], tileSize }) =>
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
