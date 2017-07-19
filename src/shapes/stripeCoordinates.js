export default ({ tileOrigin, zoomedTileSize, coordinatesOptions }) => {
	const { stripeStart, stripeEnd } = coordinatesOptions
	let coordinates = []
	const x = tileOrigin[ 0 ]
	const y = tileOrigin[ 1 ]
	const tileArgs = { x, y, zoomedTileSize }

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

const pointAlongTopEdge = ({ x, y, zoomedTileSize }, { stripePosition }) => ([
	x + stripePosition * zoomedTileSize,
	y,
])

const pointAlongLeftEdge = ({ x, y, zoomedTileSize }, { stripePosition }) => ([
	x,
	y + stripePosition * zoomedTileSize,
])

const pointAlongRightEdge = ({ x, y, zoomedTileSize }, { stripePosition }) => ([
	x + zoomedTileSize,
	y + (stripePosition - 1) * zoomedTileSize,
])

const pointAlongBottomEdge = ({ x, y, zoomedTileSize }, { stripePosition }) => ([
	x + (stripePosition - 1) * zoomedTileSize,
	y + zoomedTileSize,
])

const pointInTopRightCorner = ({ x, y, zoomedTileSize }) => ([
	x + zoomedTileSize,
	y,
])

const pointInBottomRightCorner = ({ x, y, zoomedTileSize }) => ([
	x + zoomedTileSize,
	y + zoomedTileSize,
])

const pointInBottomLeftCorner = ({ x, y, zoomedTileSize }) => ([
	x,
	y + zoomedTileSize,
])
