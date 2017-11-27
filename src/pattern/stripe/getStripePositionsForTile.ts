import { getSetting } from '../../app'
import { Address } from '../grid'
import { StripePositionSettings } from './stripePositionSettings'
import { StripePosition } from './types'

const getStripePositionsForTile: (_?: { gridAddress?: Address }) => StripePosition[] =
	({ gridAddress }: { gridAddress?: Address } = {}): StripePosition[] => {
		const { getStripePositions }: StripePositionSettings = getSetting.default('stripePositionSettings')

		return getStripePositions({ gridAddress })
	}

export default getStripePositionsForTile
