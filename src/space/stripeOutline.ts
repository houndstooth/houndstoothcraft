import Outline from './Outline'

const stripeOutline: Outline = ({ tileOrigin, tileSize, outlineOptions }) => {
	const { stripeStart, stripeEnd } = outlineOptions
	const originAndSize = { x: tileOrigin[ 0 ], y: tileOrigin[ 1 ], size: tileSize }

	const stripeStartsInTopLeftHalf = stripeStart < 1
	const stripeEndsInBottomRightHalf = stripeEnd > 1

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
	const stripeStartsInTopLeftCorner = stripeStart === 0
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

	const stripeEndsInBottomRightCorner = stripeEnd === 2
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
	x + stripePosition * size,
	y,
]

const pointAlongLeftEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => [
	x,
	y + stripePosition * size,
]

const pointAlongRightEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => [
	x + size,
	y + (stripePosition - 1) * size,
]

const pointAlongBottomEdge: Point = ({ originAndSize: { x, y, size }, stripePosition }) => [
	x + (stripePosition - 1) * size,
	y + size,
]

const pointInTopRightCorner: Point = ({ originAndSize: { x, y, size } }) => [
	x + size,
	y,
]

const pointInBottomRightCorner: Point = ({ originAndSize: { x, y, size } }) => [
	x + size,
	y + size,
]

const pointInBottomLeftCorner: Point = ({ originAndSize: { x, y, size } }) => [
	x,
	y + size,
]

type OriginAndSize = { x: number, y: number, size: number }

type Points = {
	({}: {
		outline: number[][],
		originAndSize: OriginAndSize,
		stripeStartsInTopLeftHalf?: boolean,
		stripeEndsInBottomRightHalf?: boolean,
		stripeStart?: number
		stripeEnd?: number,
	}): void,
}

type Point = {
	({}: { originAndSize: OriginAndSize, stripePosition?: number }): number[],
}
export default stripeOutline
