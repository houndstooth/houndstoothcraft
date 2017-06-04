export default ({ origin, vector, coordinatesOptions }) => {
	const { stripeStart, stripeEnd } = coordinatesOptions
	let coordinates = []

	if (stripeStart <= 1) {
		coordinates.push([
			origin[ 0 ] + stripeStart * vector[ 0 ],
			origin[ 1 ]
		])
	} else {
		coordinates.push([
			origin[ 0 ] + vector[ 0 ],
			origin[ 1 ] + (stripeStart - 1) * vector[ 1 ]
		])
	}

	if (stripeEnd <= 1) {
		coordinates.push([
			origin[ 0 ] + stripeEnd * vector[ 0 ],
			origin[ 1 ]
		])
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + stripeEnd * vector[ 1 ]
		])
	} else {
		if (stripeStart <= 1) {
			coordinates.push([
				origin[ 0 ] + vector[ 0 ],
				origin[ 1 ]
			])
		}

		coordinates.push([
			origin[ 0 ] + vector[ 0 ],
			origin[ 1 ] + (stripeEnd - 1) * vector[ 1 ]
		])
		coordinates.push([
			origin[ 0 ] + (stripeEnd - 1) * vector[ 0 ],
			origin[ 1 ] + vector[ 1 ]
		])
	}

	if (stripeStart <= 1) {
		if (stripeEnd > 1) {
			coordinates.push([
				origin[ 0 ],
				origin[ 1 ] + vector[ 1 ]
			])
		}
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + stripeStart * vector[ 1 ]
		])
	} else {
		coordinates.push([
			origin[ 0 ] + (stripeStart - 1) * vector[ 0 ],
			origin[ 1 ] + vector[ 1 ]
		])
	}

	return coordinates
}
