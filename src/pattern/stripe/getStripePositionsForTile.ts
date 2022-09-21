import { Address } from '../grid'
import { patternState } from '../patternState'

import { StripePositionSettings } from './stripePositionSettings'
import { StripePosition } from './types'

const getStripePositionsForTile: (_?: { address?: Address }) => StripePosition[] =
	({ address }: { address?: Address } = {}): StripePosition[] => {
		const { getStripePositions }: StripePositionSettings = patternState.stripeSettings.stripePositionSettings

		return getStripePositions({ address })
	}

export default getStripePositionsForTile
