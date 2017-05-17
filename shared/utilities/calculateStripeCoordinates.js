export default ({ stripeWidthInTermsOfPerimeter, currentPositionAlongPerimeter, sizedUnit, origin }) => {
	let coordinates = []

	if (currentPositionAlongPerimeter <= 1) {
		coordinates.push([
			origin[ 0 ] + currentPositionAlongPerimeter * sizedUnit,
			origin[ 1 ]
		])
	} else {
		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + (currentPositionAlongPerimeter - 1) * sizedUnit
		])
	}

	if ((currentPositionAlongPerimeter + stripeWidthInTermsOfPerimeter) <= 1) {
		coordinates.push([
			origin[ 0 ] + (currentPositionAlongPerimeter + stripeWidthInTermsOfPerimeter) * sizedUnit,
			origin[ 1 ]
		])
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + (currentPositionAlongPerimeter + stripeWidthInTermsOfPerimeter) * sizedUnit
		])
	} else {
		if (currentPositionAlongPerimeter <= 1) {
			coordinates.push([
				origin[ 0 ] + sizedUnit,
				origin[ 1 ]
			])
		}

		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + (currentPositionAlongPerimeter - 1 + stripeWidthInTermsOfPerimeter) * sizedUnit
		])
		coordinates.push([
			origin[ 0 ] + (currentPositionAlongPerimeter - 1 + stripeWidthInTermsOfPerimeter) * sizedUnit,
			origin[ 1 ] + sizedUnit
		])
	}

	if (currentPositionAlongPerimeter <= 1) {
		if ((currentPositionAlongPerimeter + stripeWidthInTermsOfPerimeter) > 1) {
			coordinates.push([
				origin[ 0 ] ,
				origin[ 1 ] + sizedUnit
			])
		}
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + currentPositionAlongPerimeter * sizedUnit
		])
	} else {
		coordinates.push([
			origin[ 0 ] + (currentPositionAlongPerimeter - 1) * sizedUnit,
			origin[ 1 ] + sizedUnit
		])
	}

	return coordinates
}