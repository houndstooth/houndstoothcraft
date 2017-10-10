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

const middlePoints: Points = ({
	outline,
	stripeStartsInTopLeftHalf,
	stripeEndsInBottomRightHalf,
	originAndSize,
	stripeEnd,
}) => {
	if (!stripeEndsInBottomRightHalf) {
		outline.push(pointAlongTopEdge({ originAndSize, stripePosition: stripeEnd }))
		outline.push(pointAlongLeftEdge({ originAndSize, stripePosition: stripeEnd }))
	}
	else {
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
}

const lastPoints: Points = lastArgs => {
	const { outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeStart } = lastArgs
	const stripeStartsInTopLeftCorner = stripeStart === 0
	if (!stripeStartsInTopLeftCorner) {
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
	else {
		if (stripeEndsInBottomRightHalf) {
			outline.push(pointInBottomLeftCorner({ originAndSize }))
		}
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
		stripeStartsInTopLeftHalf: boolean,
		stripeEndsInBottomRightHalf?: boolean,
		originAndSize: OriginAndSize,
		stripeStart?: number
		stripeEnd?: number,
	}): void,
}

type Point = {
	({}: { originAndSize: OriginAndSize, stripePosition?: number }): number[],
}
export default stripeOutline
