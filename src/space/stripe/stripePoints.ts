import * as from from '../../from'
import * as to from '../../to'
import { Point } from '../types'

const pointAlongTopEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		stripePositionValue * from.Units(size) + from.Units(x),
		from.Units(y),
	])
}

const pointAlongLeftEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		from.Units(x),
		stripePositionValue * from.Units(size) + from.Units(y),
	])
}

const pointAlongRightEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		from.Units(x) + from.Units(size),
		from.Units(y) + (stripePositionValue - 1) * from.Units(size),
	])
}

const pointAlongBottomEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => {
	const stripePositionValue = from.StripePosition(stripePosition || to.StripePosition(0))

	return to.Coordinate([
		from.Units(x) + (stripePositionValue - 1) * from.Units(size),
		from.Units(y) + from.Units(size),
	])
}

const pointInTopRightCorner: Point = ({ originAndSize: { x, y, size } }) =>
	to.Coordinate([
		from.Units(x) + from.Units(size),
		from.Units(y),
	])

const pointInBottomRightCorner: Point = ({ originAndSize: { x, y, size } }) =>
	to.Coordinate([
		from.Units(x) + from.Units(size),
		from.Units(y) + from.Units(size),
	])

const pointInBottomLeftCorner: Point = ({ originAndSize: { x, y, size } }) =>
	to.Coordinate([
		from.Units(x),
		from.Units(y) + from.Units(size),
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
