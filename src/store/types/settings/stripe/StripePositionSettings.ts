import { GetStripePositions, StripeCountMode } from '../../../../components'
import { StripeCountContinuumSettings } from './stripePosition'

interface StripePositionSettings {
	getStripePositions: GetStripePositions,
	stripeCount: number,
	stripeCountContinuumSettings: Partial<StripeCountContinuumSettings>,
	stripeCountMode: StripeCountMode,
}

export { StripePositionSettings }
