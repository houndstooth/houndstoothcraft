import { getFromBaseOrDefaultPattern, StripePositionSettings } from '../store'
import { Address, StripePosition } from './types'

const getStripePositionsForTile: (_?: { gridAddress: Address }) => StripePosition[] = params => {
	const { gridAddress = undefined } = params || {}
	const { getStripePositions }: StripePositionSettings = getFromBaseOrDefaultPattern('stripePositionSettings')

	return getStripePositions({ gridAddress })
}

export { getStripePositionsForTile }
