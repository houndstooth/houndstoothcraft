export default ({ origin, sizedUnit, coordinatesFunctionArguments }) => {
	const { stripeStart, stripeEnd } = coordinatesFunctionArguments
	let coordinates = []

	if (stripeStart <= 1) {
		coordinates.push([
			origin[ 0 ] + stripeStart * sizedUnit,
			origin[ 1 ]
		])
	} else {
		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + (stripeStart - 1) * sizedUnit
		])
	}

	if (stripeEnd <= 1) {
		coordinates.push([
			origin[ 0 ] + stripeEnd * sizedUnit,
			origin[ 1 ]
		])
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + stripeEnd * sizedUnit
		])
	} else {
		if (stripeStart <= 1) {
			coordinates.push([
				origin[ 0 ] + sizedUnit,
				origin[ 1 ]
			])
		}

		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + (stripeEnd - 1) * sizedUnit
		])
		coordinates.push([
			origin[ 0 ] + (stripeEnd - 1) * sizedUnit,
			origin[ 1 ] + sizedUnit
		])
	}

	if (stripeStart <= 1) {
		if (stripeEnd > 1) {
			coordinates.push([
				origin[ 0 ],
				origin[ 1 ] + sizedUnit
			])
		}
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + stripeStart * sizedUnit
		])
	} else {
		coordinates.push([
			origin[ 0 ] + (stripeStart - 1) * sizedUnit,
			origin[ 1 ] + sizedUnit
		])
	}

	return coordinates
}
