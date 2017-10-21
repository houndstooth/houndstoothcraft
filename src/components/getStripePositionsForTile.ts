import { state } from '../state'
import * as to from '../to'
import { perStripe } from './perStripe'
import { Address, StripePosition } from './types'

const getStripePositionsForTile: (_?: { gridAddress: Address }) => StripePosition[] = params => {
	const { gridAddress = undefined } = params || {}
	const { getStripePositions } = state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings
	const stripePositionsForTile = getStripePositions || standardStripePositions

	return stripePositionsForTile({ gridAddress })
}

const standardStripePositions: () => StripePosition[] = () => perStripe({ getStripePosition: standardStripePosition })

const standardStripePosition: (_: { stripeCount, stripeIndex }) => StripePosition = ({ stripeCount, stripeIndex }) =>
	to.StripePosition(stripeIndex / stripeCount)

export { getStripePositionsForTile }
