export default ({ shapeOrigin, sizedUnit, coordinatesOptions }) => {
	const { stripeStart, stripeEnd } = coordinatesOptions
	let coordinates = []
	const x = shapeOrigin[ 0 ]
	const y = shapeOrigin[ 1 ]

	if (stripeStart <= 1) {
		coordinates.push([
			x + stripeStart * sizedUnit,
			y
		])
	} else {
		coordinates.push([
			x + sizedUnit,
			y + (stripeStart - 1) * sizedUnit
		])
	}

	if (stripeEnd <= 1) {
		coordinates.push([
			x + stripeEnd * sizedUnit,
			y
		])
		coordinates.push([
			x,
			y + stripeEnd * sizedUnit
		])
	} else {
		if (stripeStart <= 1) {
			coordinates.push([
				x + sizedUnit,
				y
			])
		}

		coordinates.push([
			x + sizedUnit,
			y + (stripeEnd - 1) * sizedUnit
		])
		coordinates.push([
			x + (stripeEnd - 1) * sizedUnit,
			y + sizedUnit
		])
	}

	if (stripeStart <= 1) {
		if (stripeEnd > 1) {
			coordinates.push([
				x,
				y + sizedUnit
			])
		}
		coordinates.push([
			x,
			y + stripeStart * sizedUnit
		])
	} else {
		coordinates.push([
			x + (stripeStart - 1) * sizedUnit,
			y + sizedUnit
		])
	}

	return coordinates
}
