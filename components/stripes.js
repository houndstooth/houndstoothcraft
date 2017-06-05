import { PERIMETER_SCALAR } from '../application/constants'
import getDerasterizedByAreaStripe from '../variations/derasterized/getDerasterizedByAreaStripe'
import getHarmonicContinuumSegmentStripe from '../variations/harmonitooth/getHarmonicContinuumSegmentStripe'
import getHarmonicContinuumStripe from '../variations/harmonitooth/getHarmonicContinuumStripe'
import getGinghamChevronContinuumStripes from '../variations/gingham-chevron-continuum/getGinghamChevronContinuumStripes'
import state from '../state/state'
import codeUtilities from '../utilities/codeUtilities'

export default ({ stripeCount, address }) => {
	let stripes
	if (state.stripeCountConfig.mode === 'GINGHAM_CHEVRON_CONTINUUM') {
		stripes = getGinghamChevronContinuumStripes({ address })
	} else {
		stripes = codeUtilities.iterator(stripeCount).map(stripeIndex => {
			const stripeStyle = state.stripeStyle

			let stripe
			if (stripeStyle === 'DERASTERIZED_BY_AREA') {
				stripe = getDerasterizedByAreaStripe({ stripeCount, stripeIndex })
			} else if (stripeStyle === 'SEGMENT_OF_HARMONIC_CONTINUUM_ACROSS_GRID') {
				stripe = getHarmonicContinuumSegmentStripe({ stripeCount, stripeIndex })
			} else if (stripeStyle === 'FULL_HARMONIC_CONTINUUM_COMPRESSED_INTO_SINGLE_TILE') {
				stripe = getHarmonicContinuumStripe({ stripeCount, stripeIndex })
			} else if (stripeStyle === 'STANDARD') {
				stripe = stripeIndex / stripeCount
			} else {
				console.log('stripe style not set!')
			}

			return stripe * PERIMETER_SCALAR
		})
	}

	return stripes
}
