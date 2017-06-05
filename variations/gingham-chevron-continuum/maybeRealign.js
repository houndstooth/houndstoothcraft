import neededStripeCountToCoverGrid from './neededStripeCountToCoverGrid'
import state from '../../shared/state/state'
import mathUtilities from '../../shared/utilities/mathUtilities'

export default ({ setForTile, address }) => {
	const { initial, delta } = state.stripeCountConfig.ginghamChevronContinuum

	for (let n = 0; n < neededStripeCountToCoverGrid(); n++) {
		const thisStripe = mathUtilities.termialRoot({ initial, delta, n }) * 2
		if (thisStripe > address[ 0 ] + address[ 1 ]) {
			if (n % 2 === 1) {
				return setForTile.reverse()
			} else {
				return setForTile
			}
		}
	}

	return setForTile
}
