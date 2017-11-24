// tslint:disable-next-line:no-reaching-imports
import { getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import { Address } from '../grid'
import { StripePositionSettings } from './stripePositionSettings'
import { StripePosition } from './types'

const getStripePositionsForTile: (_?: { gridAddress?: Address }) => StripePosition[] =
	({ gridAddress }: { gridAddress?: Address } = {}): StripePosition[] => {
		const { getStripePositions }: StripePositionSettings = getFromBaseOrDefaultPattern('stripePositionSettings')

		return getStripePositions({ gridAddress })
	}

export { getStripePositionsForTile }
