import state from '../../state'
import perStripe from './perStripe'

const getStripePositionsForTile = ({ gridAddress } = {}) => {
	const getStripePositions = state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.getStripePositions
	const getStripePositionsForTile = getStripePositions || standardStripePositions
	return getStripePositionsForTile({ gridAddress })
}

const standardStripePositions = () => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition = ({ stripeIndex, stripeCount }) => stripeIndex / stripeCount

export default getStripePositionsForTile
