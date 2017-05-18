import render from '../render/render'
import { STRIPE_COUNT, DERASTERIZED_BY_AREA } from '../common/customize'
import calculateStripeCoordinates from '../utilities/calculateStripeCoordinates'
import calculateDerasterizedByAreaStripeCoordinates from '../../derasterized/utilities/calculateDerasterizedByAreaStripeCoordinates'
import maybeRotateStripe from '../utilities/maybeRotateStripe'
import iterator from '../utilities/iterator'

export default ({ sizedUnit, center, origin, rotationAboutCenter, rotationAboutOrigin, originColor, otherColor }) => {
	const stripeWidthInTermsOfPerimeter = 2 / STRIPE_COUNT

	iterator(STRIPE_COUNT).forEach(i => {
		const color = i % 2 === 0 ? originColor : otherColor

		let coordinates
		if (DERASTERIZED_BY_AREA) {
			coordinates = calculateDerasterizedByAreaStripeCoordinates({
				totalStripes: STRIPE_COUNT,
				currentStripe: i,
				sizedUnit,
				origin
			})
		} else {
			// consider switching this to also consume a simple totalStripes and currentStripes
			coordinates = calculateStripeCoordinates({
				stripeWidthInTermsOfPerimeter,
				currentPositionAlongPerimeter: i * stripeWidthInTermsOfPerimeter,
				sizedUnit,
				origin
			})
		}

		coordinates = maybeRotateStripe({ coordinates, center, origin, rotationAboutCenter, rotationAboutOrigin })

		render({ color, coordinates })
	})
}