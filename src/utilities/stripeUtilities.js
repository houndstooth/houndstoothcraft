import codeUtilities from './codeUtilities'
import { PERIMETER_SCALAR } from '../constants'
import store from '../../store'

const getStripePositionsForTile = ({ address } = {}) => {
	const getStripePositionsForTile = store.currentState.mainHoundstooth.basePattern.getStripePositions || standardStripePositions
	return getStripePositionsForTile({ address })
}

const standardStripePositions = () => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition = ({ stripeIndex, stripeCount }) => stripeIndex / stripeCount

const perStripe = ({ getStripePosition }) => {
	const stripeCount = store.currentState.mainHoundstooth.basePattern.stripeCountSettings.stripeCount
	return codeUtilities.iterator(stripeCount).map(stripeIndex => {
		return getStripePosition({ stripeIndex, stripeCount }) * PERIMETER_SCALAR
	})
}

export default {
	getStripePositionsForTile,
	perStripe,
}
