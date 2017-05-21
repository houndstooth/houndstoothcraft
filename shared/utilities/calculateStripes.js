import iterator from './iterator'
import calculateHarmonicContinuumSegmentStripe from '../../harmonitooth/utilities/calculateHarmonicContinuumSegmentStripe'
import calculateHarmonicContinuumStripe from '../../harmonitooth/utilities/calculateHarmonicContinuumStripe'
import calculateDerasterizedByAreaStripe from '../../derasterized/utilities/calculateDerasterizedByAreaStripe'
import state from '../../state'

const PERIMETER_SCALAR = 2

export default ({ stripeCount }) => iterator(stripeCount).map(stripeIndex => {
	const stripeStyle = state.shared.stripeStyle
	
	let stripe
	if (stripeStyle === 'DERASTERIZED_BY_AREA') {
		stripe = calculateDerasterizedByAreaStripe({ stripeCount, stripeIndex })
	} else if (stripeStyle === 'SEGMENT_OF_HARMONIC_CONTINUUM_ACROSS_GRID') {
		stripe = calculateHarmonicContinuumSegmentStripe({ stripeCount, stripeIndex })
	} else if (stripeStyle === 'FULL_HARMONIC_CONTINUUM_COMPRESSED_INTO_SINGLE_TILE') {
		stripe = calculateHarmonicContinuumStripe({ stripeCount, stripeIndex })
	} else if (stripeStyle === 'STANDARD') {
		stripe = stripeIndex / stripeCount
	} else {
		console.log('stripe style not set!')
	}

	return stripe * PERIMETER_SCALAR
})
