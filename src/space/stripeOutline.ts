const stripeOutline = ({ tileOrigin, tileSize, outlineOptions }) => {
	const { stripeStart, stripeEnd } = outlineOptions
	const tileArgs = { x: tileOrigin[ 0 ], y: tileOrigin[ 1 ], tileSize }

	const stripeStartsInTopLeftHalf = stripeStart < 1
	const stripeEndsInBottomRightHalf = stripeEnd > 1

	const outline = []
	firstPoint({ outline, stripeStartsInTopLeftHalf, tileArgs, stripeStart })
	middlePoints({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, tileArgs, stripeEnd })
	lastPoints({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, tileArgs, stripeStart })
	return outline
}

const firstPoint = ({ outline, stripeStartsInTopLeftHalf, tileArgs, stripeStart }) => {
	if (stripeStartsInTopLeftHalf) {
		outline.push(pointAlongTopEdge(tileArgs, { stripePosition: stripeStart }))
	}
	else {
		outline.push(pointAlongRightEdge(tileArgs, { stripePosition: stripeStart }))
	}
}

const middlePoints = ({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, tileArgs, stripeEnd }) => {
	if (!stripeEndsInBottomRightHalf) {
		outline.push(pointAlongTopEdge(tileArgs, { stripePosition: stripeEnd }))
		outline.push(pointAlongLeftEdge(tileArgs, { stripePosition: stripeEnd }))
	}
	else {
		if (stripeStartsInTopLeftHalf) {
			outline.push(pointInTopRightCorner(tileArgs))
		}

		const stripeEndsInBottomRightCorner = stripeEnd === 2
		if (stripeEndsInBottomRightCorner) {
			outline.push(pointInBottomRightCorner(tileArgs))
		}
		else {
			outline.push(pointAlongRightEdge(tileArgs, { stripePosition: stripeEnd }))
			outline.push(pointAlongBottomEdge(tileArgs, { stripePosition: stripeEnd }))
		}
	}
}

const lastPoints = ({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, tileArgs, stripeStart }) => {
	const stripeStartsInTopLeftCorner = stripeStart === 0
	if (!stripeStartsInTopLeftCorner) {
		if (stripeStartsInTopLeftHalf) {
			stripeEndsInBottomRightHalf && outline.push(pointInBottomLeftCorner(tileArgs))
			outline.push(pointAlongLeftEdge(tileArgs, { stripePosition: stripeStart }))
		}
		else {
			outline.push(pointAlongBottomEdge(tileArgs, { stripePosition: stripeStart }))
		}
	}
	else {
		if (stripeEndsInBottomRightHalf) {
			outline.push(pointInBottomLeftCorner(tileArgs))
		}
	}
}

const pointAlongTopEdge = ({ x, y, tileSize }, { stripePosition }) => [
	x + stripePosition * tileSize,
	y,
]

const pointAlongLeftEdge = ({ x, y, tileSize }, { stripePosition }) => [
	x,
	y + stripePosition * tileSize,
]

const pointAlongRightEdge = ({ x, y, tileSize }, { stripePosition }) => [
	x + tileSize,
	y + (stripePosition - 1) * tileSize,
]

const pointAlongBottomEdge = ({ x, y, tileSize }, { stripePosition }) => [
	x + (stripePosition - 1) * tileSize,
	y + tileSize,
]

const pointInTopRightCorner = ({ x, y, tileSize }) => [
	x + tileSize,
	y,
]

const pointInBottomRightCorner = ({ x, y, tileSize }) => [
	x + tileSize,
	y + tileSize,
]

const pointInBottomLeftCorner = ({ x, y, tileSize }) => [
	x,
	y + tileSize,
]

export default stripeOutline
