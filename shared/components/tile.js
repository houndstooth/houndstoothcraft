import render from '../render/render'
import { STRIPE_COUNT, UNIT } from '../common/customize'
import calculateOriginAndCenter from '../utilities/calculateOriginAndCenter'
import calculateStripeCoordinates from '../utilities/calculateStripeCoordinates'
import maybeRotateStripe from '../utilities/maybeRotateStripe'
import iterator from '../utilities/iterator'
import maybeFlipGrain from '../utilities/maybeFlipGrain'
import maybeMixColors from '../utilities/maybeMixColors'

export default ({
	origin: initialOrigin,
	center: initialCenter,
	size,
	originColor: initialOriginColor,
	otherColor: initialOtherColor,
	scaleFromGridCenter,
	rotationAboutCenter,
	rotationAboutOrigin
}) => {
	size = size || 1
	const sizedUnit = size * UNIT
	const { origin, center } = calculateOriginAndCenter({
		initialOrigin,
		initialCenter,
		scaleFromGridCenter,
		sizedUnit
	})

	let { originColor: nextOriginColor, otherColor: nextOtherColor } = maybeFlipGrain({
		originColor: initialOriginColor,
		otherColor: initialOtherColor
	})
	const { originColor, otherColor } = maybeMixColors({
		originColor: nextOriginColor,
		otherColor: nextOtherColor
	})

	const stripeWidthInTermsOfPerimeter = 2 / STRIPE_COUNT

	iterator(STRIPE_COUNT).forEach(i => {
		const color = i % 2 === 0 ? originColor : otherColor

		let coordinates = calculateStripeCoordinates({
			stripeWidthInTermsOfPerimeter,
			currentPositionAlongPerimeter: i * stripeWidthInTermsOfPerimeter,
			sizedUnit,
			origin
		})
		coordinates = maybeRotateStripe({ coordinates, center, origin, rotationAboutCenter, rotationAboutOrigin })

		render({ color, coordinates })
	})
}