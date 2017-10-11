import state from '../state'
import perStripe from './perStripe'
import { Address, StripePositions } from './types'

const getStripePositionsForTile: { ({}?: { gridAddress? }): Address } = ({ gridAddress } = {}) => {
	const stripePositionSettings = state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings
	const getStripePositions = stripePositionSettings.getStripePositions
	const stripePositionsForTile = getStripePositions || standardStripePositions
	return stripePositionsForTile({ gridAddress })
}

const standardStripePositions: { (): StripePositions } = () => perStripe({ getStripePosition: standardStripePosition })

type StandardStripePosition = { ({}: { stripeIndex, stripeCount }): number }

const standardStripePosition: StandardStripePosition = ({ stripeIndex, stripeCount }) => stripeIndex / stripeCount

export default getStripePositionsForTile
