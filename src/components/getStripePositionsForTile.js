import store from '../../store'
import perStripe from './perStripe'

export default ({ gridAddress } = {}) => {
	const getStripePositions = store.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.getStripePositions
	const getStripePositionsForTile = getStripePositions || standardStripePositions
	return getStripePositionsForTile({ gridAddress })
}

const standardStripePositions = () => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition = ({ stripeIndex, stripeCount }) => stripeIndex / stripeCount
