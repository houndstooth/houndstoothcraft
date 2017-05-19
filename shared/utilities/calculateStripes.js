import { STRIPE_STYLE } from '../common/customize'
import iterator from './iterator'
import calculateHarmonicContinuumSegmentStripe from '../../harmonitooth/utilities/calculateHarmonicContinuumSegmentStripe'
import calculateHarmonicContinuumStripe from '../../harmonitooth/utilities/calculateHarmonicContinuumStripe'
import calculateDerasterizedByAreaStripe from '../../derasterized/utilities/calculateDerasterizedByAreaStripe'

const PERIMETER_SCALAR = 2

export default ({ stripeCount }) => iterator(stripeCount).map(stripeIndex => {
	let stripe
	if (STRIPE_STYLE === 'DERASTERIZED_BY_AREA') {
		stripe = calculateDerasterizedByAreaStripe({ stripeCount, stripeIndex })
	} else if (STRIPE_STYLE === 'SEGMENT_OF_HARMONIC_CONTINUUM_ACROSS_GRID') {
		stripe = calculateHarmonicContinuumSegmentStripe({ stripeCount, stripeIndex })
	} else if (STRIPE_STYLE === 'FULL_HARMONIC_CONTINUUM_COMPRESSED_INTO_SINGLE_TILE') {
		stripe = calculateHarmonicContinuumStripe({ stripeCount, stripeIndex })
	} else if (STRIPE_STYLE === 'STANDARD') {
		stripe = stripeIndex / stripeCount
	} else {
		console.log('stripe style not set!')
	}

	return stripe * PERIMETER_SCALAR
})
