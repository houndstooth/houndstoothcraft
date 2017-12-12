import { Address } from '../grid'
import { patternState } from '../patternState'
import { StripePositionSettings } from './stripePositionSettings'
import { StripePosition } from './types'

const getStripePositionsForTile: (_?: { gridAddress?: Address }) => StripePosition[] =
	({ gridAddress }: { gridAddress?: Address } = {}): StripePosition[] => {
		const { getStripePositions }: StripePositionSettings = patternState.stripeSettings.stripePositionSettings

		return getStripePositions({ gridAddress })
	}

export default getStripePositionsForTile
