import { getFromBaseOrDefaultPattern } from '../../app'
import { Address } from '../grid'
import { StripePositionSettings } from './stripePositionSettings'
import { StripePosition } from './types'

const getStripePositionsForTile: (_?: { gridAddress?: Address }) => StripePosition[] =
	({ gridAddress }: { gridAddress?: Address } = {}): StripePosition[] => {
		const { getStripePositions }: StripePositionSettings = getFromBaseOrDefaultPattern.main('stripePositionSettings')

		return getStripePositions({ gridAddress })
	}

export { getStripePositionsForTile as main }
