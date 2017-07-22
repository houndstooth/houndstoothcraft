import codeUtilities from './codeUtilities'
import { PERIMETER_SCALAR } from '../constants'

const getStripePositionsForTile = ({ address } = {}) => {
	const getStripePositionsForTile = currentState.builtPattern.base.getStripePositions || standardStripePositions
	return getStripePositionsForTile({ address })
}

const standardStripePositions = () => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition = ({ stripeIndex, stripeCount }) => stripeIndex / stripeCount

const perStripe = ({ getStripePosition }) => {
	const stripeCount = currentState.builtPattern.base.stripeCountSettings.stripeCount
	return codeUtilities.iterator(stripeCount).map(stripeIndex => {
		return getStripePosition({ stripeIndex, stripeCount }) * PERIMETER_SCALAR
	})
}

export default {
	getStripePositionsForTile,
	perStripe,
}
