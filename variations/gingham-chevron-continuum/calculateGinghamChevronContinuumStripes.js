import neededStripeCountToCoverGrid from './neededStripeCountToCoverGrid'
import state from '../../shared/state/state'
import mathUtilities from '../../shared/utilities/mathUtilities'

export default ({ address }) => {
	const { initial, delta } = state.stripeCountConfig.ginghamChevronContinuum
	let stripes = [ 0 ]
	const distanceFromOrigin = Math.abs(address[ 0 ]) + Math.abs(address[ 1 ])

	for (let n = 0; n < neededStripeCountToCoverGrid(); n++) {
		const stripe = mathUtilities.termialRoot({ initial, delta, n }) * 2
		if (stripe >= distanceFromOrigin + 2) {
			return stripes
		}
		if (stripe > distanceFromOrigin) {
			stripes.push((stripe - distanceFromOrigin) % 2)
		}
	}

	return stripes
}
