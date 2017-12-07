import { Address } from '../grid'
import { get } from '../patternState'
import { StripePositionSettings } from './stripePositionSettings'
import { StripePosition } from './types'

const getStripePositionsForTile: (_?: { gridAddress?: Address }) => StripePosition[] =
	({ gridAddress }: { gridAddress?: Address } = {}): StripePosition[] => {
		const { getStripePositions }: StripePositionSettings = get('stripePositionSettings')

		return getStripePositions({ gridAddress })
	}

export default getStripePositionsForTile
