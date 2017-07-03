export default ({ tileOrigin, sizedUnit, coordinatesOptions }) => {
	const { stripeStart, stripeEnd } = coordinatesOptions
	let coordinates = []
	const x = tileOrigin[ 0 ]
	const y = tileOrigin[ 1 ]
	const tileArgs = { x, y, sizedUnit }

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

const pointAlongTopEdge = ({ x, y, sizedUnit }, { stripePosition }) => ([
	x + stripePosition * sizedUnit,
	y,
])

const pointAlongLeftEdge = ({ x, y, sizedUnit }, { stripePosition }) => ([
	x,
	y + stripePosition * sizedUnit,
])

const pointAlongRightEdge = ({ x, y, sizedUnit }, { stripePosition }) => ([
	x + sizedUnit,
	y + (stripePosition - 1) * sizedUnit,
])

const pointAlongBottomEdge = ({ x, y, sizedUnit }, { stripePosition }) => ([
	x + (stripePosition - 1) * sizedUnit,
	y + sizedUnit,
])

const pointInTopRightCorner = ({ x, y, sizedUnit }) => ([
	x + sizedUnit,
	y,
])

const pointInBottomRightCorner = ({ x, y, sizedUnit }) => ([
	x + sizedUnit,
	y + sizedUnit,
])

const pointInBottomLeftCorner = ({ x, y, sizedUnit }) => ([
	x,
	y + sizedUnit,
])
