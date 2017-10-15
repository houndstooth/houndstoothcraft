import state from '../state'
import perStripe from './perStripe'
import { StripePosition } from './types'

const getStripePositionsForTile: { ({}?: { gridAddress? }): StripePosition[] } = ({ gridAddress } = {}) => {
	const stripePositionSettings = state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings
	const getStripePositions = stripePositionSettings.getStripePositions
	const stripePositionsForTile = getStripePositions || standardStripePositions

	return stripePositionsForTile({ gridAddress })
}

const standardStripePositions: { (): StripePosition[] } = () => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition: { ({}: { stripeIndex, stripeCount }): StripePosition } = ({ stripeIndex, stripeCount }) =>
	stripeIndex / stripeCount as any

export default getStripePositionsForTile
