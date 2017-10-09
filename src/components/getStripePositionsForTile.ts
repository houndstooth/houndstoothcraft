import state from '../state'
import perStripe from './perStripe'

const getStripePositionsForTile = ({ gridAddress } : { gridAddress? } = {}) => {
	const getStripePositions = state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.getStripePositions
	const stripePositionsForTile = getStripePositions || standardStripePositions
	return stripePositionsForTile({ gridAddress })
}

const standardStripePositions = () => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition = ({ stripeIndex, stripeCount }) => stripeIndex / stripeCount

export default getStripePositionsForTile
