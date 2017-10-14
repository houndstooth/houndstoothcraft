import { GetOutline, Coordinate, Outline } from './types'
import { StripePosition } from '../components'

const stripeOutline: GetOutline = ({ tileOrigin, tileSize, outlineOptions }) => {
	const { stripeStart, stripeEnd } = outlineOptions
	const originAndSize = { x: tileOrigin[ 0 ], y: tileOrigin[ 1 ], size: tileSize }

	const stripeStartsInTopLeftHalf = stripeStart as any < 1
	const stripeEndsInBottomRightHalf = stripeEnd as any > 1

	const outline = []
	firstPoint({ outline, stripeStartsInTopLeftHalf, originAndSize, stripeStart })
	middlePoints({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeEnd })
	lastPoints({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeStart })
	return outline
}

const firstPoint: Points = ({ outline, stripeStartsInTopLeftHalf, originAndSize, stripeStart }) => {
	if (stripeStartsInTopLeftHalf) {
		outline.push(pointAlongTopEdge({ originAndSize, stripePosition: stripeStart }))
	}
	else {
		outline.push(pointAlongRightEdge({ originAndSize, stripePosition: stripeStart }))
	}
}

const middlePoints: Points = params => {
	const { outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeEnd } = params
	if (!stripeEndsInBottomRightHalf) {
		middlePointsWhenStripeEndsInBottomRightHalf({ outline, originAndSize, stripeEnd })
	}
	else {
		middlePointsWhenStripeDoesNotEndInBottomRightHalf({
			stripeStartsInTopLeftHalf,
			outline,
			originAndSize,
			stripeEnd,
		})
	}
}

const lastPoints: Points = params => {
	const { outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeStart } = params
	const stripeStartsInTopLeftCorner = stripeStart as any === 0
	if (!stripeStartsInTopLeftCorner) {
		lastPointsWhenStripeDoesNotStartInTopLeftCorner({
			stripeStartsInTopLeftHalf,
			stripeEndsInBottomRightHalf,
			outline,
			originAndSize,
			stripeStart,
		})
	}
	else if (stripeEndsInBottomRightHalf) {
		outline.push(pointInBottomLeftCorner({ originAndSize }))
	}
}

const middlePointsWhenStripeEndsInBottomRightHalf: Points = ({ outline, originAndSize, stripeEnd }) => {
	outline.push(pointAlongTopEdge({ originAndSize, stripePosition: stripeEnd }))
	outline.push(pointAlongLeftEdge({ originAndSize, stripePosition: stripeEnd }))
}

const middlePointsWhenStripeDoesNotEndInBottomRightHalf: Points = params => {
	const { stripeStartsInTopLeftHalf, outline, originAndSize, stripeEnd } = params

	if (stripeStartsInTopLeftHalf) {
		outline.push(pointInTopRightCorner({ originAndSize }))
	}

	const stripeEndsInBottomRightCorner = stripeEnd as any === 2
	if (stripeEndsInBottomRightCorner) {
		outline.push(pointInBottomRightCorner({ originAndSize }))
	}
	else {
		outline.push(pointAlongRightEdge({ originAndSize, stripePosition: stripeEnd }))
		outline.push(pointAlongBottomEdge({ originAndSize, stripePosition: stripeEnd }))
	}
}

const lastPointsWhenStripeDoesNotStartInTopLeftCorner: Points = params => {
	const { stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, outline, originAndSize, stripeStart } = params

	if (stripeStartsInTopLeftHalf && stripeEndsInBottomRightHalf) {
		outline.push(pointInBottomLeftCorner({ originAndSize }))
	}

	if (stripeStartsInTopLeftHalf) {

		outline.push(pointAlongLeftEdge({ originAndSize, stripePosition: stripeStart }))
	}
	else {
		outline.push(pointAlongBottomEdge({ originAndSize, stripePosition: stripeStart }))
	}
}

const pointAlongTopEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => [
	x + (stripePosition as any) * size,
	y,
] as Coordinate

const pointAlongLeftEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => [
	x,
	y + (stripePosition as any) * size,
] as Coordinate

const pointAlongRightEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => [
	x + size,
	y + (stripePosition as any - 1) * size,
] as Coordinate

const pointAlongBottomEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => [
	x + (stripePosition as any - 1) * size,
	y + size,
] as Coordinate

const pointInTopRightCorner: Point = ({ originAndSize: { x, y, size } }) => [
	x + size,
	y,
] as Coordinate

const pointInBottomRightCorner: Point = ({ originAndSize: { x, y, size } }) => [
	x + size,
	y + size,
] as Coordinate

const pointInBottomLeftCorner: Point = ({ originAndSize: { x, y, size } }) => [
	x,
	y + size,
] as Coordinate

type OriginAndSize = { x: number, y: number, size: number }

type Points = {
	({}: {
		outline: Outline,
		originAndSize: OriginAndSize,
		stripeStartsInTopLeftHalf?: boolean,
		stripeEndsInBottomRightHalf?: boolean,
		stripeStart?: StripePosition
		stripeEnd?: StripePosition,
	}): void,
}

type Point = {
	({}: { originAndSize: OriginAndSize, stripePosition?: StripePosition }): Coordinate,
}
export default stripeOutline
