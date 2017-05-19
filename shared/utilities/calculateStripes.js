import { DERASTERIZED_BY_AREA, HARMONIZE_STRIPE_WIDTH } from '../common/customize'
import iterator from './iterator'
import calculateHarmonicStripe from '../../harmonitooth/utilities/calculateHarmonicStripe'
import calculateDerasterizedByAreaStripe from '../../derasterized/utilities/calculateDerasterizedByAreaStripe'

const PERIMETER_SCALAR = 2

export default ({ stripeCount }) => iterator(stripeCount).map(stripeIndex => {
	let stripe
	if (DERASTERIZED_BY_AREA) {
		stripe = calculateDerasterizedByAreaStripe({ stripeCount, stripeIndex })
	} else if (HARMONIZE_STRIPE_WIDTH) {
		stripe = calculateHarmonicStripe({ stripeCount, stripeIndex })
	} else {
		stripe = stripeIndex / stripeCount
	}

	return stripe * PERIMETER_SCALAR
})
