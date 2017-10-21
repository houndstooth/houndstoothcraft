import { getSetting, StripePositionSettings } from '../store'
import { Address, StripePosition } from './types'

const getStripePositionsForTile: (_?: { gridAddress: Address }) => StripePosition[] = params => {
	const { gridAddress = undefined } = params || {}
	const { getStripePositions }: StripePositionSettings = getSetting('stripePosition')

	return getStripePositions({ gridAddress })
}

export { getStripePositionsForTile }
