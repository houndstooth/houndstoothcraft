import * as from from '../../utilities/from'
import * as to from '../../utilities/to'
import { Point } from '../types'

const pointAlongTopEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		stripePositionValue * from.Unit(size) + from.Unit(x),
		from.Unit(y),
	])
}

const pointAlongLeftEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		from.Unit(x),
		stripePositionValue * from.Unit(size) + from.Unit(y),
	])
}

const pointAlongRightEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		from.Unit(x) + from.Unit(size),
		from.Unit(y) + (stripePositionValue - 1) * from.Unit(size),
	])
}

const pointAlongBottomEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		from.Unit(x) + (stripePositionValue - 1) * from.Unit(size),
		from.Unit(y) + from.Unit(size),
	])
}

const pointInTopRightCorner: Point = ({ originAndSize: { x, y, size } }) =>
	to.Coordinate([
		from.Unit(x) + from.Unit(size),
		from.Unit(y),
	])

const pointInBottomRightCorner: Point = ({ originAndSize: { x, y, size } }) =>
	to.Coordinate([
		from.Unit(x) + from.Unit(size),
		from.Unit(y) + from.Unit(size),
	])

const pointInBottomLeftCorner: Point = ({ originAndSize: { x, y, size } }) =>
	to.Coordinate([
		from.Unit(x),
		from.Unit(y) + from.Unit(size),
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
