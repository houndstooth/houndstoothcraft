import { StripeCountMode, StripePosition } from '../../../../components'
import { StripeCountContinuumSettings } from './stripePosition'

interface StripePositionSettings {
	stripeCountContinuumSettings: Partial<StripeCountContinuumSettings>,
	stripeCountMode: StripeCountMode,
	stripeCountSetting: number,
	getStripePositions(p?: any): StripePosition[],
}

export { StripePositionSettings }
