import flipXAndY from './flipXAndY'

const substripeOfSquare = ({ origin, sizedUnit, coordinatesOptions }) => {
	const { orientation, substripeIndex, substripeCount } = coordinatesOptions
	const substripeUnit = sizedUnit / substripeCount
	const substripeStart = substripeIndex * substripeUnit
	const substripeEnd = substripeStart + substripeUnit

	let coordinates = [
		[
			origin[ 0 ] + substripeStart,
			origin[ 1 ]
		],
		[
			origin[ 0 ] + substripeEnd,
			origin[ 1 ]
		],
		[
			origin[ 0 ] + substripeEnd,
			origin[ 1 ] + sizedUnit
		],
		[
			origin[ 0 ] + substripeStart,
			origin[ 1 ] + sizedUnit
		],
	]

	if (orientation === "HORIZONTAL") coordinates = flipXAndY({ coordinates, origin })

	return coordinates
}

const substripeOfStripe = ({ origin, sizedUnit, coordinatesOptions }) => {
	let { stripeStart, stripeEnd, orientation, substripeIndex, substripeCount } = coordinatesOptions
	const substripeUnit = sizedUnit / substripeCount

	const substripeStart = substripeIndex * substripeUnit
	const substripeEnd = substripeStart + substripeUnit

	stripeStart = stripeStart * sizedUnit - substripeStart
	stripeEnd = stripeEnd * sizedUnit - substripeStart

	// this stripe is completely off the right edge of the substripe
	if (stripeStart - substripeUnit >= sizedUnit) return
	// this stripe is completely off the left edge of the substripe
	if (stripeEnd <= 0) return

	let coordinates = []

	// top left (which may also turn out to be top right)
	if (stripeStart > sizedUnit) {
		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + substripeStart + stripeStart - sizedUnit
		])
	} else if (stripeStart >= 0) {
		coordinates.push([
			origin[ 0 ] + stripeStart,
			origin[ 1 ] + substripeStart
		])
	} else {
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + substripeStart
		])
	}

	// possibly top right, and possibly middle right
	if (stripeEnd <= sizedUnit) {
		coordinates.push([
			origin[ 0 ] + stripeEnd,
			origin[ 1 ] + substripeStart
		])
	} else {
		if (stripeStart < sizedUnit) {
			coordinates.push([
				origin[ 0 ] + sizedUnit,
				origin[ 1 ] + substripeStart
			])
		}
		if (stripeEnd < sizedUnit + substripeUnit) {
			coordinates.push([
				origin[ 0 ] + sizedUnit,
				origin[ 1 ] + substripeStart + stripeEnd - sizedUnit
			])
		}
	}

	// bottom right, and potentially early return to skip last section
	if (stripeEnd - substripeUnit >= sizedUnit) {
		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + substripeEnd
		])
	} else if (stripeEnd - substripeUnit >= 0) {
		coordinates.push([
			origin[ 0 ] + stripeEnd - substripeUnit,
			origin[ 1 ] + substripeEnd
		])
	} else {
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + substripeStart + stripeEnd
		])
		return coordinates
	}

	// if not skipping this section due to early return, bottom left, and possibly middle left
	if (stripeStart - substripeUnit > 0) {
		coordinates.push([
			origin[ 0 ] + stripeStart - substripeUnit,
			origin[ 1 ] + substripeEnd
		])
	} else {
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + substripeEnd
		])
		if (stripeStart > 0) {
			coordinates.push([
				origin[ 0 ],
				origin[ 1 ] + substripeStart + stripeStart
			])
		}
	}

	if (orientation === "VERTICAL") coordinates = flipXAndY({ coordinates, origin })

	return coordinates
}

export default {
	substripeOfSquare,
	substripeOfStripe
}