import render from '../render/render'
import { STRIPE_COUNT, UNIT } from '../common/customize'
import calculateOriginAndCenter from '../utilities/calculateOriginAndCenter'
import calculateStripeCoordinates from '../utilities/calculateStripeCoordinates'
import rotateStripe from '../utilities/rotateStripe'
import iterator from '../utilities/iterator'
import maybeFlipGrain from '../utilities/maybeFlipGrain'

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

	const { originColor, otherColor } = maybeFlipGrain({
		originColor: initialOriginColor,
		otherColor: initialOtherColor
	})
	// let color

	let stripeWidthInTermsOfPerimeter = 2 / STRIPE_COUNT
	// let currentPositionAlongPerimeter

	iterator(STRIPE_COUNT).forEach(i => {
		// const currentPositionAlongPerimeter =
		const color = i % 2 === 0 ? originColor : otherColor

		let coordinates = calculateStripeCoordinates({
			stripeWidthInTermsOfPerimeter,
			currentPositionAlongPerimeter: i * stripeWidthInTermsOfPerimeter,
			sizedUnit,
			origin
		})
		coordinates = rotateStripe({ coordinates, center, origin, rotationAboutCenter, rotationAboutOrigin })

		render({ color, coordinates })
	})
}