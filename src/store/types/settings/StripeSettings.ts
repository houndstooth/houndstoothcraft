import { BaseStripeDiagonal, StripeCountMode, StripePosition } from '../../../components'

interface StripeSettings {
	baseStripeDiagonal?: BaseStripeDiagonal,
	stripePositionSettings?: {
		stripeCountContinuumSettings?: {
			deltaStripeCount?: number,
			initialStripeCount?: number,
		},
		stripeCountMode?: StripeCountMode,
		stripeCountSetting?: number,
		getStripePositions?(p?: any): StripePosition[],
	},
}

export { StripeSettings }
