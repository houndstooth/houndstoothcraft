import { getFromBaseOrDefaultPattern, StripePositionSettings } from '../store'
import { Address, StripePosition } from './types'

const getStripePositionsForTile: (_?: { gridAddress?: Address[] }) => StripePosition[] =
	({ gridAddress }: { gridAddress?: Address[] } = {}): StripePosition[] => {
		const { getStripePositions }: StripePositionSettings = getFromBaseOrDefaultPattern('stripePositionSettings')

		return getStripePositions({ gridAddress })
	}

export { getStripePositionsForTile }
