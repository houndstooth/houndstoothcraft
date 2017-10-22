import { GetStripePositions, StripeCountMode } from '../../../../components'
import { StripeCountContinuumSettings } from './stripePosition'

interface StripePositionSettings {
	getStripePositions: GetStripePositions,
	stripeCountContinuumSettings: Partial<StripeCountContinuumSettings>,
	stripeCountMode: StripeCountMode,
	stripeCountSetting: number,
}

export { StripePositionSettings }
