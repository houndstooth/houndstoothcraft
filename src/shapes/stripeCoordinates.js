export default ({ tileOrigin, tileSize, coordinatesOptions }) => {
	const { stripeStart, stripeEnd } = coordinatesOptions
	let coordinates = []
	const x = tileOrigin[ 0 ]
	const y = tileOrigin[ 1 ]
	const tileArgs = { x, y, tileSize }

	const stripeStartsInTopLeftCorner = stripeStart === 0
	const stripeStartsInTopLeftHalf = stripeStart < 1
	const stripeEndsInBottomRightHalf = stripeEnd > 1
	const stripeEndsInBottomRightCorner = stripeEnd === 2

	if (stripeStartsInTopLeftHalf) {
		coordinates.push(pointAlongTopEdge(tileArgs, { stripePosition: stripeStart }))
	}
	else {
		coordinates.push(pointAlongRightEdge(tileArgs, { stripePosition: stripeStart }))
	}

	if (!stripeEndsInBottomRightHalf) {
		coordinates.push(pointAlongTopEdge(tileArgs, { stripePosition: stripeEnd }))
		coordinates.push(pointAlongLeftEdge(tileArgs, { stripePosition: stripeEnd }))
	}
	else {
		if (stripeStartsInTopLeftHalf) {
			coordinates.push(pointInTopRightCorner(tileArgs))
		}

		if (stripeEndsInBottomRightCorner) {
			coordinates.push(pointInBottomRightCorner(tileArgs))
		}
		else {
			coordinates.push(pointAlongRightEdge(tileArgs, { stripePosition: stripeEnd }))
			coordinates.push(pointAlongBottomEdge(tileArgs, { stripePosition: stripeEnd }))
		}
	}

	if (!stripeStartsInTopLeftCorner) {
		if (stripeStartsInTopLeftHalf) {
			if (stripeEndsInBottomRightHalf) {
				coordinates.push(pointInBottomLeftCorner(tileArgs))
			}
			coordinates.push(pointAlongLeftEdge(tileArgs, { stripePosition: stripeStart }))
		}
		else {
			coordinates.push(pointAlongBottomEdge(tileArgs, { stripePosition: stripeStart }))
		}
	}
	else {
		if (stripeEndsInBottomRightHalf) {
			coordinates.push(pointInBottomLeftCorner(tileArgs))
		}
	}

	return coordinates
}

const pointAlongTopEdge = ({ x, y, tileSize }, { stripePosition }) => ([
	x + stripePosition * tileSize,
	y,
])

const pointAlongLeftEdge = ({ x, y, tileSize }, { stripePosition }) => ([
	x,
	y + stripePosition * tileSize,
])

const pointAlongRightEdge = ({ x, y, tileSize }, { stripePosition }) => ([
	x + tileSize,
	y + (stripePosition - 1) * tileSize,
])

const pointAlongBottomEdge = ({ x, y, tileSize }, { stripePosition }) => ([
	x + (stripePosition - 1) * tileSize,
	y + tileSize,
])

const pointInTopRightCorner = ({ x, y, tileSize }) => ([
	x + tileSize,
	y,
])

const pointInBottomRightCorner = ({ x, y, tileSize }) => ([
	x + tileSize,
	y + tileSize,
])

const pointInBottomLeftCorner = ({ x, y, tileSize }) => ([
	x,
	y + tileSize,
])
