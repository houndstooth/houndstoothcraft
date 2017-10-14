import state from '../state'
import perStripe from './perStripe'
import { Address, StripePosition } from './types'

const getStripePositionsForTile: { ({}?: { gridAddress? }): Address } = ({ gridAddress } = {}) => {
	const stripePositionSettings = state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings
	const getStripePositions = stripePositionSettings.getStripePositions
	const stripePositionsForTile = getStripePositions || standardStripePositions
	return stripePositionsForTile({ gridAddress })
}

const standardStripePositions: { (): StripePosition[] } = () => perStripe({ getStripePosition: standardStripePosition })

type StandardStripePosition = { ({}: { stripeIndex, stripeCount }): StripePosition }

const standardStripePosition: StandardStripePosition = ({ stripeIndex, stripeCount }) => stripeIndex / stripeCount

export default getStripePositionsForTile
