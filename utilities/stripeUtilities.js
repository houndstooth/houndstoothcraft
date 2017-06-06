import state from '../state/state'
import codeUtilities from '../utilities/codeUtilities'
import { PERIMETER_SCALAR } from '../application/constants'

const getStripePositionsForTile = ({ address }) => {
	const getStripePositionsForTile = state.getStripePositions || standardStripePositions
	return getStripePositionsForTile({ address })
}

const standardStripePositions = () => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition = ({ stripeIndex, stripeCount }) => stripeIndex / stripeCount

const perStripe = ({ getStripePosition }) => {
	const { stripeCount } = state.stripeCountConfig
	return codeUtilities.iterator(stripeCount).map(stripeIndex => {
		return getStripePosition({ stripeIndex, stripeCount }) * PERIMETER_SCALAR
	})
}

export default {
	getStripePositionsForTile,
	perStripe
}
